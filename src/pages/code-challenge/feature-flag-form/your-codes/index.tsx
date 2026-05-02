import { useForm } from '@tanstack/react-form'
import Header from '#/components/features/header'
import { defaultFeatureFlag, featureFlagSchema } from './schema'
import FlagMetadataSection from './components/FlagMetadataSection'
import VariationsSection from './components/VariationsSection'
import TargetingSection from './components/TargetingSection'
import DefaultRuleSection from './components/DefaultRuleSection'
import JsonPreview from './components/JsonPreview'
import { formToSchema } from './utils/form-to-schema'

function YourCode() {
  const form = useForm({
    defaultValues: defaultFeatureFlag,
    validators: { onChange: featureFlagSchema },
    onSubmit: async ({ value }) => {
      const output = formToSchema(value)
      console.log('Submitted flag config:', output)
      alert('Flag config submitted! Check the console for the JSON output.')
    },
  })

  return (
    <section>
      <Header
        title="Feature Flag Editor"
        subTitle="กรอกข้อมูลด้านซ้าย แล้วดู JSON อัปเดตแบบ real-time ด้านขวา"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 bg-[rgb(27,27,29)] py-5 px-5">
          {/* LEFT: Form */}
          <div
            className="bg-[rgb(54,54,54)] p-6 space-y-8 overflow-hidden"
            style={{ borderRadius: '7px' }}
          >
            <FlagMetadataSection form={form} />

            <VariationsSection form={form} />

            <TargetingSection form={form} />

            <DefaultRuleSection form={form} />

            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="text-white w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                  >
                    {isSubmitting ? 'Submitting...' : 'Save Flag'}
                  </button>
                </div>
              )}
            </form.Subscribe>
          </div>

          {/* RIGHT: JSON Preview */}
          <div className="bg-slate-950 rounded-xl border border-border overflow-hidden h-fit sticky top-4">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">
                output.json
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
            </div>
            <JsonPreview form={form} />
          </div>
        </div>
      </form>
    </section>
  )
}

export default YourCode
