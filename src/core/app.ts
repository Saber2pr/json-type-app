/*
 * @Author: saber2pr
 * @Date: 2019-06-13 22:47:49
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-14 16:47:02
 */
const filterChar = (word: string) => word.replace(/\/|\@|\.|\-/g, '_')
const headUpper = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
const resolvJsonTypes = (json: string) => json.replace(/"/g, '')
namespace Type {
  export const isObject = (obj: any): obj is Object =>
    Object.prototype.toString.call(obj) === '[object Object]'

  export const isArray = <T>(obj: any): obj is Array<T> =>
    Object.prototype.toString.call(obj) === '[object Array]'
}
const jsonToDTs = (name: string, json: string): string => {
  const obj = JSON.parse(json)
  const objTyped = transform(obj)
  const newJson = JSON.stringify(objTyped)
  const interfBody = resolvJsonTypes(newJson)
  return toInterface(name, interfBody)
}
const toInterface = (name: string, content: string) =>
  `export interface ${headUpper(name)} ${content}`
function transform(data: Object) {
  if (Type.isObject(data)) {
    return parseObj(data)
  } else if (Type.isArray(data)) {
    return parseArr(data)
  } else {
    return typeof data
  }
}
const parseObj = (data: Object) => {
  if (Type.isArray(data)) return parseArr(data)
  if (!Type.isObject(data)) return typeof data
  return Object.entries(data).reduce(
    (out, [k, v]) => Object.assign(out, { [filterChar(k)]: parseObj(v) }),
    {}
  )
}
const parseArr = (arr: Array<any>) =>
  `Array<${resolvJsonTypes(JSON.stringify(transform(arr[0])))}>`
export default jsonToDTs
