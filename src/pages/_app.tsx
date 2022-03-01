import "../styles/globals.scss";
import type { AppProps } from "next/app";
import SidenvProvider from "../providers/sidenavProvider";
import UserLoggedProvider from "../providers/userLoggedProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserLoggedProvider>
      <SidenvProvider>
        <Component {...pageProps} />
      </SidenvProvider>
    </UserLoggedProvider>
  );
}

export default MyApp;
