import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

import theme from '../styles/theme'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* <link rel="manifest" href="/mainfest.json" /> */}
          <link rel="shortcut icon" href="/icon_64x64.png" />
          <link rel="apple-touch-icon" href="/icon_64x64.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Noto+Sans+KR:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

export default MyDocument
