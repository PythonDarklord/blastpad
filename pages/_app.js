import "@/styles/globals.css";
import Script from "next/script"
import {useEffect} from "react"

const GTM_ID = "GTM-5XJ3VFM3"; // Replace with your actual GTM ID

export default function MyApp({Component, pageProps}) {
    useEffect(() => {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            window.dataLayer.push(arguments);
        }

        gtag("js", new Date());
        gtag("config", 'G-84FXE5M316');
    }, []);
    useEffect(() => {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            window.dataLayer.push(arguments);
        }

        gtag("js", new Date());
        gtag("config", GTM_ID);
    }, []);

    useEffect(() => {
        function gtag() {
            window.dataLayer.push(arguments);
        }

        gtag('event', 'conversion', {
            'send_to': 'AW-16498348917/b5KcCNiz6NIZEPWmg7s9',
            'value': 1.0,
            'currency': 'USD'
        }, []);
    })


    return (
        <>
            {/* Google Tag Manager */}
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
                }}
            />
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-84FXE5M316');
          `,
                }}
            />

            {/* End Google Tag Manager */}
            <Component {...pageProps} />
        </>
  );
}
