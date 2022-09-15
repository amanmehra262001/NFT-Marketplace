import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import Header from "./components/Header";
import { NotificationProvider } from "@web3uikit/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      initializeOnMount={true}
    >
      <NotificationProvider>
        <Header />
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;
