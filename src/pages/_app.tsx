import "../styles/globals.scss";
import type { AppProps } from "next/app";
import SidenvProvider from "../providers/sidenavProvider";
import UserLoggedProvider from "../providers/userLoggedProvider";
import SnackbarProvider from "../providers/snackbarProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <UserLoggedProvider>
        <SidenvProvider>
          <Component {...pageProps} />
        </SidenvProvider>
      </UserLoggedProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
