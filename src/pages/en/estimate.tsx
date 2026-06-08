import Head from "next/head";
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
