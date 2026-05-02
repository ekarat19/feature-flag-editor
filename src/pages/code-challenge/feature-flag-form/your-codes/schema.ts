import { z } from 'zod'

export const variationSchema = z.object({
  name: z.string().min(1, 'Variation name is required'),
  value: z.string().min(1, 'Variation value is required'),
})

export const targetingRuleSchema = z.object({
  id: z.string(),
  query: z.string().min(1, 'Query is required'),
  percentage: z.number().min(0).max(100),
  variation: z.string().min(1, 'Variation is required'),
})

export const featureFlagSchema = z.object({
  name: z.string().min(1, 'Flag name is required'),
  description: z.string(),
  enabled: z.boolean(),
  variations: z
    .array(variationSchema)
    .min(1, 'At least one variation is required'),
  targeting: z.array(targetingRuleSchema),
  defaultVariation: z.string().min(1, 'Default variation is required'),
})

export type Variation = z.infer<typeof variationSchema>
export type TargetingRule = z.infer<typeof targetingRuleSchema>
export type FeatureFlag = z.infer<typeof featureFlagSchema>

export const newRuleId = () =>
  `rule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export const defaultFeatureFlag: FeatureFlag = {
  name: 'my-new-feature',
  description: '',
  enabled: true,
  variations: [
    { name: 'on', value: 'true' },
    { name: 'off', value: 'false' },
  ],
  targeting: [
    {
      id: 'rule-default-1',
      query: "group == 'beta'",
      percentage: 50,
      variation: 'on',
    },
  ],
  defaultVariation: 'off',
}
