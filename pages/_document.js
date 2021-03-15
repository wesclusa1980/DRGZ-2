import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>DRGZ</title>
          <script src="https://unpkg.com/feather-icons"></script>
          <link rel="shortcut icon" href="/token3.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script>feather.replace()</script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
