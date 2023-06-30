import "../styles/globals.css";
import { ProductsContextProvider } from "../components/ProductsContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

// export default function App({ Component, pageProps }) {
//   return (
//     <ProductsContextProvider>
//       <Component {...pageProps} />
//     </ProductsContextProvider>
//   );
// }

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <Script
          async
          crossOrigin="anonymous"
          src={
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7574220191401579"
          }
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>
    </>
  );
}
