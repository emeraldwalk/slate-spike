import React, { useState } from 'react';
import { Value } from 'slate';
import { Editor as SlateEditor } from 'slate-react';
import WordPlugin from '../plugins/word';

const initialState =  Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragaph',
        nodes: [
          {
            object: 'text',
            text: 'Hello from the first block.'
          }
        ]
      },
      {
        object: 'block',
        type: 'paragaph',
        nodes: [
          {
            object: 'text',
            text: 'This is another paragraph.'
          }
        ]
      }
    ]
  }
});

const plugins = [
  WordPlugin()
]

export interface EditorProps {
}

const Editor: React.FC<EditorProps> = () => {
  const [value, setValue] = useState(
    initialState
  );

  return (
    <div className="c_editor">
      <SlateEditor
        onChange={({ value }: { value: Value }) => {
          setValue(value)
        }}
        plugins={plugins}
        value={value}
      />
    </div>
  );
}

export default Editor;