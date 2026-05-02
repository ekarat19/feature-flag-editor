import type { AnyFieldApi } from '@tanstack/react-form'

interface Props {
  form: any
}

function DefaultRuleSection({ form }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-extrabold text-[rgb(227,227,227)]">
        Default
      </h2>

      <div
        style={{ borderRadius: '7px' }}
        className="border border-[rgb(135,196,183)] px-5 py-5"
      >
        <form.Subscribe selector={(state: any) => state.values.variations}>
          {(variations: Array<{ name: string }>) => (
            <form.Field name="defaultVariation">
              {(field: AnyFieldApi) => (
                <div className="flex items-center gap-3">
                  <label className="text-[rgb(227,227,227)] text-xs font-medium text-muted-foreground">
                    Serve
                  </label>
                  <select
                    style={{ borderRadius: '7px' }}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="focus:outline-none text-[rgb(227,227,227)] w-full px-3 py-2 rounded-md bg-[rgb(68,68,68)] text-sm"
                  >
                    <option value="">-- Select a variation --</option>
                    {variations
                      .filter((v) => v.name.trim() !== '')
                      .map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>
    </div>
  )
}

export default DefaultRuleSection
