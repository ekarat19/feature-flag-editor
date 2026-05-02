import type { FeatureFlag } from '../schema'

/**
 * Converts form values into the expected JSON shape (matches assignment.tsx)
 */
export function formToSchema(values: FeatureFlag) {
  // Convert "true"/"false"/numbers in strings to actual JS values
  const parseValue = (v: string) => {
    if (v === 'true') return true
    if (v === 'false') return false
    if (!isNaN(Number(v)) && v.trim() !== '') return Number(v)
    return v
  }

  // Build variations object: [{name, value}] -> { name1: value1, name2: value2 }
  const variations: Record<string, unknown> = {}
  for (const v of values.variations) {
    if (v.name.trim() !== '') {
      variations[v.name] = parseValue(v.value)
    }
  }

  // Build targeting array (only include rules with a query)
  const targeting = values.targeting
    .filter((t) => t.query.trim() !== '')
    .map((t) => ({
      query: t.query,
      percentage: t.percentage,
      variation: t.variation,
    }))

  // Use flag name as the key under "flags"
  const flagKey = values.name.trim() || 'unnamed-flag'

  return {
    flags: {
      [flagKey]: {
        variations,
        targeting,
        defaultRule: {
          variation: values.defaultVariation,
        },
      },
    },
  }
}
