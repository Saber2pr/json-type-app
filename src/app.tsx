import React, { useState, useRef, useEffect } from 'react'
import { FileUpload } from './components/file-upload'
import { TwoSide } from './components/two-side'
import jsonToDTs from './core/app'
import { FileDownload } from './components/file-download'
const pkg: { version: string } = require('../package.json')
import './app.less'
import 'normalize.css'

const demo = {
  name: 'Default',
  get json() {
    return JSON.stringify({ a: 'a', b: true }, null, 2)
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

  const resetHeight = () => {
    const target = text_ref.current
    target && (target.style.height = target.scrollHeight + 'px')
  }

  useEffect(() => resetHeight(), [json])

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
        <ul>
          <li>
            <p>
              <FileUpload
                onUploaded={(res, file) => {
                  const name = file.name.split('.')[0]
                  setName(name)
                  inputJson(name, res)

                  resetHeight()
                }}
              />
            </p>
          </li>

          <li>
            <p>
              <FileDownload name={name + '.ts'} content={ts}>
                Download d.ts
              </FileDownload>
            </p>
          </li>

          <li>
            <p>version {pkg.version}</p>
          </li>
        </ul>
      </footer>
    </>
  )
}
