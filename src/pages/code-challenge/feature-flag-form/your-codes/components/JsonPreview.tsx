import Editor from '@monaco-editor/react'
import { formToSchema } from '../utils/form-to-schema'

interface Props {
  form: any
}

function JsonPreview({ form }: Props) {
  return (
    <form.Subscribe selector={(state: any) => state.values}>
      {(values: any) => {
        const json = JSON.stringify(formToSchema(values), null, 2)
        return (
          <Editor
            height="600px"
            language="json"
            theme="vs-dark"
            value={json}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
            }}
          />
        )
      }}
    </form.Subscribe>
  )
}

export default JsonPreview
