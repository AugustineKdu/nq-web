import EstimateWizard from "../../components/EstimateWizard";
import Seo from "../../components/Seo";

export default function EstimatePageEn() {
  return (
    <>
      <Seo
        title="Project Estimate | NQ Solution"
        description="How much for the website or app you want? Get an instant estimate in about a minute and request a consultation."
        path="/en/estimate"
        noindex
      />
      <EstimateWizard lang="en" />
    </>
  );
}
