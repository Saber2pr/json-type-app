import 'normalize.css';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { createEditor, EditorAPI } from '@saber2pr/monaco';

import { Container, Editor, LeftBtn, RightBtn } from './app.style';
import { jsonToDTs } from './core/json2dts';
import { code_json } from './code';
import { clipboard } from './core/clipboard';

export const App = () => {
  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();

  const jsonEditorRef = useRef<EditorAPI>();
  const typeEditorRef = useRef<EditorAPI>();

  useEffect(() => {
    const jsonEditor = createEditor(
      leftRef.current,
      {
        'api.json': code_json,
      },
      { theme: 'vs-dark', minimap: { enabled: false } },
    );
    jsonEditorRef.current = jsonEditor;

    const typeEditor = createEditor(
      rightRef.current,
      {
        'api.d.ts': '',
      },
      { theme: 'vs-dark', readOnly: true, minimap: { enabled: false } },
    );
    typeEditorRef.current = typeEditor;

    jsonEditor.getModel().onDidChangeContent(() => {
      const content = jsonEditor.getValue();
      try {
        const output = jsonToDTs('Default', content);
        typeEditor.setValue(output);
      } catch (error) {}
    });

    jsonEditor.setValue(code_json);
    jsonEditor.getInstance().focus();
  }, []);

  return (
    <Container>
      <LeftBtn
        onClick={async () => {
          const jsonEditor = jsonEditorRef.current;
          if (jsonEditor) {
            const val = await clipboard.read();
            jsonEditor.setValue(val);
          }
        }}
      >
        粘贴
      </LeftBtn>
      <RightBtn
        onClick={async () => {
          const typeEditor = typeEditorRef.current;
          if (typeEditor) {
            const val = typeEditor.getValue();
            await clipboard.write(val);

            const range = typeEditor.getInstance().getVisibleRanges();
            typeEditor.getInstance().setSelection(range[0]);
          }
        }}
      >
        复制
      </RightBtn>
      <Editor ref={leftRef} />
      <Editor ref={rightRef} />
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
