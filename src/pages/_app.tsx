import type { NextComponentType } from "next";
import { SessionProvider } from "next-auth/react";
import {
  type AppContext,
  type AppInitialProps,
  type AppLayoutProps,
} from "next/app";
import { type ReactNode } from "react";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
