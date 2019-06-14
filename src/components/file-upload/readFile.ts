/*
 * @Author: saber2pr
 * @Date: 2019-06-09 11:21:05
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-09 11:28:53
 */
export const readFile = (file: File) =>
  new Promise<string | ArrayBuffer>(resolve => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => resolve(reader.result)
  })
