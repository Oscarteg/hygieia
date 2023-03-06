import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import "../i18n";
import { useTranslation } from "react-i18next";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {sessionData ? (
            <button onClick={() => void router.push("/recipes")}>
              {t("go_to", { target: "recipes" })}
            </button>
          ) : (
            <button onClick={() => void signIn()}>{t("Sign in")}</button>
          )}
        </div>
      </main>
    </>
  );
}
