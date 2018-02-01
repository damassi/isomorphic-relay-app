import React from 'react'

export default function HTML(props) {
  return (
    <html>
      <head>
        <title>Isomorphic Relay Modern App</title>
      </head>
      <body>
        <div id="react-root">{props.children}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <script>
                var __BOOTSTRAP__ = ${props.bootstrap};
              </script>

              <script src='/assets/artworks.js'></script>
            `
          }}
        />
      </body>
    </html>
  )
}
