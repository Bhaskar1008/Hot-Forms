import React from 'react';
import { useMonaco } from '@monaco-editor/react';

interface JsonEditorProps {
  value: object;
  onChange: (value: object) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
          uri: "http://myserver/form-schema.json",
          fileMatch: ["*"],
          schema: {
            type: "object",
            properties: {
              components: {
                type: "array",
                items: {
                  type: "object",
                  required: ["type", "label"],
                  properties: {
                    type: { type: "string" },
                    label: { type: "string" },
                    required: { type: "boolean" }
                  }
                }
              }
            }
          }
        }]
      });
    }
  }, [monaco]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <textarea
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            onChange(JSON.parse(e.target.value));
          } catch (error) {
            // Invalid JSON, ignore
          }
        }}
        className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50"
      />
    </div>
  );
};
