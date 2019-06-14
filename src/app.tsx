import React, { useState, useRef } from 'react'
import { FileUpload } from './components/file-upload'
import { TwoSide } from './components/two-side'
import jsonToDTs from './core/app'
import { FileDownload } from './components/file-download'
import './app.less'

const demo = {
  name: 'Default',
  get json() {
    return JSON.stringify({ a: 'a', b: true })
  },
  get ts() {
    return jsonToDTs(this.name, this.json)
  }
}

export const App = () => {
  const [name, setName] = useState(demo.name)

  const [json, setJson] = useState(demo.json)
  const [ts, setTs] = useState(demo.ts)

  const text_ref = useRef<HTMLTextAreaElement>(null)

  const inputJson = (name: string, json: string) => {
    try {
      setJson(json)
      setTs(jsonToDTs(name, json))
    } catch (error) {}
  }

  return (
    <>
      <header>
        <h1 className="title ani-color">
          <i>json to d.ts</i>
        </h1>
      </header>

      <main>
        <section>
          <TwoSide>
            <textarea
              className="json"
              ref={text_ref}
              value={json}
              onChange={() => inputJson(name, text_ref.current.value)}
            ></textarea>

            <textarea className="ts" value={ts} onChange={() => {}}></textarea>
          </TwoSide>
        </section>
      </main>

      <footer>
        <FileUpload
          onUploaded={(res, file) => {
            const name = file.name.split('.')[0]
            setName(name)
            inputJson(name, res)

            const target = text_ref.current as HTMLTextAreaElement
            target && (target.style.height = target.scrollHeight + 'px')
          }}
        />
        <FileDownload name={name + '.ts'} content={ts}>
          Download d.ts
        </FileDownload>
      </footer>
    </>
  )
}
