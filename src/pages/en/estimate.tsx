import Head from "next/head";
import type { GetServerSideProps } from "next";
import EstimateWizard from "../../components/EstimateWizard";

export default function EstimatePageEn() {
  return (
    <>
      <Head>
        <title>Project Estimate | NQ Solution</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="How much for the website or app you want? Get an instant estimate in about a minute and request a consultation."
        />
      </Head>
      <EstimateWizard lang="en" />
    </>
  );
}

/* dev-server / flag only — returns 404 in production unless enabled */
export const getServerSideProps: GetServerSideProps = async () => {
  const enabled =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_ESTIMATE === "true";
  if (!enabled) return { notFound: true };
  return { props: {} };
};
