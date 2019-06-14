import React from 'react'

export interface FileDownload
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  name: string
  content: string
}

export const FileDownload = ({ name, content, children }: FileDownload) => (
  <a
    className="FileDownload"
    download={name}
    href={URL.createObjectURL(new Blob([content]))}
  >
    {children}
  </a>
)
