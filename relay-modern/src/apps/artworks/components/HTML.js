import React from 'react'

export default function HTML(props) {
  return (
    <html>
      <head>
        <title>Isomorphic Relay Modern App</title>
      </head>
      <body>
        <div id="react-root">{props.children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var __BOOTSTRAP__ = ${JSON.stringify(props.bootstrap)};
            `
          }}
        />
        <script src="/assets/artworks.js" />
      </body>
    </html>
  )
}
