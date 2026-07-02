import EstimateWizard from "../components/EstimateWizard";
import Seo from "../components/Seo";

export default function EstimatePage() {
  return (
    <>
      <Seo
        title="예상 견적 계산기 | NQ Solution (엔큐솔루션)"
        description="내가 원하는 홈페이지·앱, 얼마일까? 1분 만에 예상 견적을 확인하고 바로 상담을 신청하세요."
        path="/estimate"
        enPath="/en/estimate"
        noindex
      />
      <EstimateWizard lang="ko" />
    </>
  );
}
