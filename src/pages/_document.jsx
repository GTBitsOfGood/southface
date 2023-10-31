import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            type="image/png"
            href="/static/favicon.png"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
