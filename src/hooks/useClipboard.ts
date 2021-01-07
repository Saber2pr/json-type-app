import ClipboardJS from 'clipboard'
import { useEffect } from 'react'

const createNoop: () => VoidFunction = () => () => undefined

export const useClipboard = (
  selector: string,
  callback?: (cp: ClipboardJS) => void | VoidFunction
) => {
  useEffect(() => {
    const cp = new ClipboardJS(selector)
    let effectCb = createNoop()
    if (callback) {
      const res = callback(cp)
      if (res && typeof res === 'function') {
        effectCb = res
      }
    }
    return () => {
      cp.destroy()
      if (effectCb && typeof effectCb === 'function') {
        effectCb()
      }
    }
  }, [])
}
