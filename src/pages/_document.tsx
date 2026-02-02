import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* Naver Site Verification */}
          <meta
            name="naver-site-verification"
            content="0bc84c0f9d9abb31a5402ca8779585c0586dbb65"
          />

          {/* Favicon */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/* SEO Meta Tags for Naver */}
          <meta name="author" content="NQ Solution" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="naverbot" content="index, follow" />

          {/* Open Graph Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="NQ Solution" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:image" content="https://www.nqsolution.com/logo.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://www.nqsolution.com/logo.png" />

          {/* Canonical and Language */}
          <link rel="canonical" href="https://www.nqsolution.com" />

          {/* Preconnect for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
