import type { AnyFieldApi } from '@tanstack/react-form'

interface Props {
  form: any
}

const VARIATION_COLORS = ['🟢', '🟠', '🩵', '♥️', '🫀', '🖤', '❤️‍🔥', '🤍']

function VariationsSection({ form }: Props) {
  return (
    <div className="space-y-3 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[rgb(227,227,227)]">
          Variations
        </h2>
      </div>

      <form.Field name="variations" mode="array">
        {(field: AnyFieldApi) => (
          <div className="space-y-2 ">
            {field.state.value.map((_: unknown, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                <span className="text-xl pt-1.5">
                  {VARIATION_COLORS[i % VARIATION_COLORS.length]}
                </span>

                <form.Field name={`variations[${i}].name`}>
                  {(subField: AnyFieldApi) => (
                    <div className="flex-1 relative pt-3">
                      <label
                        className="absolute top-0 left-2 z-10 px-2 py-0.5 text-[10px] font-medium text-[rgb(180,180,180)] bg-[rgb(54,54,54)]"
                        style={{ borderRadius: '7px' }}
                      >
                        Name
                      </label>
                      <input
                        style={{ borderRadius: '7px' }}
                        type="text"
                        value={subField.state.value}
                        onChange={(e) => subField.handleChange(e.target.value)}
                        onBlur={subField.handleBlur}
                        placeholder="Variation_1"
                        className="focus:outline-none text-[rgb(227,227,227)] w-full px-3 py-2 bg-[rgb(68,68,68)] text-sm"
                      />
                      {subField.state.meta.errors.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          {subField.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field name={`variations[${i}].value`}>
                  {(subField: AnyFieldApi) => (
                    <div className="flex-1 relative pt-3">
                      <label
                        style={{ borderRadius: '7px' }}
                        className="absolute top-0 left-2 z-10 px-2 py-0.5 text-[10px] font-medium text-[rgb(180,180,180)] bg-[rgb(54,54,54)]"
                      >
                        Flag Value
                      </label>
                      <input
                        style={{ borderRadius: '7px' }}
                        type="text"
                        value={subField.state.value}
                        onChange={(e) => subField.handleChange(e.target.value)}
                        onBlur={subField.handleBlur}
                        placeholder="true"
                        className="focus:outline-none text-[rgb(227,227,227)] w-full px-3 py-2 bg-[rgb(68,68,68)] text-sm"
                      />
                      {subField.state.meta.errors.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">
                          {subField.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <button
                  type="button"
                  onClick={() => field.removeValue(i)}
                  className="pb-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-[rgb(135,196,183)] text-[rgb(227,227,227)] text-xl font-bold hover:cursor-pointer transition"
                  aria-label="Remove variation"
                >
                  -
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => field.pushValue({ name: '', value: '' })}
              aria-label="Add variation"
              className="ml-10 flex items-center justify-center w-7 h-7 rounded-full bg-[rgb(135,196,183)] text-[rgb(227,227,227)] text-xl font-bold hover:cursor-pointer transition pb-0.5"
            >
              +
            </button>

            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-red-500">
                {field.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>
    </div>
  )
}

export default VariationsSection
