import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta
            name="naver-site-verification"
            content="0bc84c0f9d9abb31a5402ca8779585c0586dbb65"
          />
        </Head>
        <body className="bg-light-background dark:bg-dark-background antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
