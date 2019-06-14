import React from 'react'
import { readFile } from './readFile'

export interface FileUploadProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onUploaded?(value: string, file: File): any
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploaded,
  ...props
}) => {
  const read = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files[0]

    readFile(event.target.files[0]).then(res => {
      onUploaded && onUploaded(res.toString(), file)
    })
  }

  return <input {...props} type="file" onChange={read} />
}
