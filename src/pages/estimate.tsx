import Head from "next/head";
import type { GetServerSideProps } from "next";
import EstimateWizard from "../components/EstimateWizard";

export default function EstimatePage() {
  return (
    <>
      <Head>
        <title>예상 견적 계산기 | NQ Solution (엔큐솔루션)</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="내가 원하는 홈페이지·앱, 얼마일까? 1분 만에 예상 견적을 확인하고 바로 상담을 신청하세요." />
      </Head>
      <EstimateWizard lang="ko" />
    </>
  );
}

/* dev-server / flag 전용 — 프로덕션에서는 직접 접근 시 404 */
export const getServerSideProps: GetServerSideProps = async () => {
  const enabled =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_ESTIMATE === "true";
  if (!enabled) return { notFound: true };
  return { props: {} };
};
