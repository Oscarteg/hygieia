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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "../../i18n.config.mjs";
import { appWithTranslation } from "next-i18next";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return getLayout(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
