import type { AnyFieldApi } from '@tanstack/react-form'
import { newRuleId } from '../schema'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  form: any
}

function SortableRule({
  id,
  index,
  form,
  onRemove,
}: {
  id: string
  index: number
  form: any
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="space-y-3 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-[rgb(227,227,227)]"
            aria-label="Drag to reorder"
          >
            ⋮⋮
          </button>
          <span className="text-xs font-semibold text-[rgb(227,227,227)] uppercase tracking-wider">
            Rule {index + 1}
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-[rgb(135,196,183)] text-[rgb(227,227,227)] text-xl font-bold hover:cursor-pointer transition"
          aria-label="Remove rule"
        >
          -
        </button>
      </div>

      <form.Field name={`targeting[${index}].query`}>
        {(subField: AnyFieldApi) => (
          <div className="space-y-1">
            <label className="text-[rgb(227,227,227)] text-xs font-medium text-muted-foreground">
              Query
            </label>
            <input
              style={{ borderRadius: '7px' }}
              type="text"
              value={subField.state.value}
              onChange={(e) => subField.handleChange(e.target.value)}
              onBlur={subField.handleBlur}
              placeholder="group == 'beta'"
              className="focus:outline-none text-[rgb(227,227,227)] w-full px-3 py-2 rounded-md bg-[rgb(68,68,68)] text-sm font-mono"
            />
            {subField.state.meta.errors.length > 0 && (
              <p className="text-xs text-red-500">
                {subField.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-3 gap-2">
        <form.Field name={`targeting[${index}].variation`}>
          {(subField: AnyFieldApi) => (
            <div className="col-span-2 space-y-1">
              <label className="text-[rgb(227,227,227)] text-xs font-medium text-muted-foreground">
                Variation
              </label>
              <input
                style={{ borderRadius: '7px' }}
                type="text"
                value={subField.state.value}
                onChange={(e) => subField.handleChange(e.target.value)}
                onBlur={subField.handleBlur}
                placeholder="on"
                className="focus:outline-none text-[rgb(227,227,227)] w-full px-3 py-2 rounded-md bg-[rgb(68,68,68)] text-sm"
              />
              {subField.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {subField.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name={`targeting[${index}].percentage`}>
          {(subField: AnyFieldApi) => (
            <div className="space-y-1">
              <label className="text-[rgb(227,227,227)] text-xs font-medium text-muted-foreground">
                Percentage
              </label>
              <input
                style={{ borderRadius: '7px' }}
                type="number"
                min={0}
                max={100}
                value={subField.state.value}
                onChange={(e) => subField.handleChange(Number(e.target.value))}
                onBlur={subField.handleBlur}
                className="focus:outline-none text-[rgb(227,227,227)] w-full px-3 py-2 rounded-md bg-[rgb(68,68,68)] text-sm"
              />
              {subField.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {subField.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>
    </div>
  )
}

function TargetingSection({ form }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-extrabold text-[rgb(227,227,227)]">
        Target specific users
      </h2>

      <form.Field name="targeting" mode="array">
        {(field: AnyFieldApi) => {
          const rules = field.state.value as Array<unknown>

          const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event
            if (!over || active.id === over.id) return

            const rulesTyped = rules as Array<{ id: string }>
            const oldIndex = rulesTyped.findIndex((r) => r.id === active.id)
            const newIndex = rulesTyped.findIndex((r) => r.id === over.id)
            if (oldIndex === -1 || newIndex === -1) return

            field.moveValue(oldIndex, newIndex)
          }

          return (
            <div className="space-y-2">
              {rules.length === 0 && (
                <p className="text-sm text-[rgb(227,227,227)] py-2">Add Rule</p>
              )}

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={(rules as Array<{ id: string }>).map((r) => r.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {(rules as Array<{ id: string }>).map((rule, i) => (
                    <SortableRule
                      key={rule.id}
                      id={rule.id}
                      index={i}
                      form={form}
                      onRemove={() => field.removeValue(i)}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <button
                type="button"
                onClick={() =>
                  field.pushValue({
                    id: newRuleId(),
                    query: '',
                    percentage: 100,
                    variation: '',
                  })
                }
                aria-label="Add rule"
                className="pb-0.5 flex items-center justify-center w-7 h-7 rounded-full bg-[rgb(135,196,183)] text-[rgb(227,227,227)] text-xl font-bold hover:cursor-pointer transition"
              >
                +
              </button>
            </div>
          )
        }}
      </form.Field>
    </div>
  )
}

export default TargetingSection
