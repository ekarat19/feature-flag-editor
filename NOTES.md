Thank you for reviewing my submission.
Below are notes on my technical approaches,

1. Tool used

- TanStack: For: routing framework.
- Zod: For form validation.
- Tailwind CSS: For styling.
- Monaco Editor: For live JSON preview.

2. Simple Work Flow
   2.1 Define schema and form validation (zod) in `schema.ts`
   2.2 Create form field components to collect user input as,

- FlagMetadataSection (name, description, enabled toggle)
- VariationsSection (dynamic variations array)
- TargetingSection (dynamic targeting rules + drag-and-drop)
- DefaultRuleSection (default variation dropdown)
  2.3 Wire all sections together in `index.tsx` using TanStack.
  2.4 Setup live convertion form state -> JSON in `form-to-schema.ts` then setup `JsonPreview.tsx` for live display using form.Subscribe + Monaco Editor.
  2.5 Polish and finalize the design with Tailwind CSS.

Thank you for the opportunity to work on this challenge.
