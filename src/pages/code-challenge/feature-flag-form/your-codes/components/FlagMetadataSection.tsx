import type { AnyFieldApi } from '@tanstack/react-form'

interface Props {
  form: any
}

function FlagMetadataSection({ form }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        {/* Flag Name */}
        <form.Field name="name">
          {(field: AnyFieldApi) => (
            <div className="relative pt-3">
              <label
                style={{ borderRadius: '7px' }}
                className="absolute top-0 left-2 z-10 px-2 py-0.5 text-[10px] font-medium text-[rgb(180,180,180)] bg-[rgb(54,54,54)] rounded-t-md"
              >
                Flag Name
              </label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="my-new-feature"
                style={{ borderRadius: '7px' }}
                className="w-full px-3 py-2 border-0 bg-[rgb(68,68,68)] text-base text-[rgb(227,227,227)] placeholder:text-[rgb(180,180,180)] focus:outline-none"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Enabled toggle */}
        <form.Field name="enabled">
          {(field: AnyFieldApi) => (
            <div className="flex items-center">
              <label className="text-sm font-medium text-[rgb(227,227,227)]">
                Status
              </label>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-background h-[42px]">
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.state.value}
                  onClick={() => field.handleChange(!field.state.value)}
                  className="relative inline-flex h-7 w-14 items-center rounded-full bg-[rgb(68,68,68)] transition-colors"
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full transition-all duration-200 ${
                      field.state.value
                        ? 'translate-x-7 bg-[rgb(135,196,183)]'
                        : 'translate-x-1 bg-orange-400'
                    }`}
                  />
                </button>
                <span
                  className={`text-sm ${
                    field.state.value ? 'text-teal-400' : 'text-orange-400'
                  }`}
                >
                  {field.state.value ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          )}
        </form.Field>
      </div>

      {/* Description */}
      <form.Field name="description">
        {(field: AnyFieldApi) => (
          <div className="relative pt-3">
            <label
              style={{ borderRadius: '7px' }}
              className="absolute top-0 left-2 z-10 px-2 py-0.5 text-[10px] font-medium text-[rgb(180,180,180)] bg-[rgb(54,54,54)] rounded-t-md"
            >
              Description
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Flag Description"
              style={{ borderRadius: '7px' }}
              className="focus:outline-none text-[rgb(227,227,227)] bg-[rgb(68,68,68)] w-full px-3 py-2 text-sm"
            />
          </div>
        )}
      </form.Field>
    </div>
  )
}

export default FlagMetadataSection
