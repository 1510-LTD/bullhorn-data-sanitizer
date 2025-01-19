"use client";

import PageWrapper from "@/layouts/PageWrapper";
import dynamic from "next/dynamic";

const Tools = dynamic(() => import("./(UI)/tools/tools"), {
  ssr: false
});

export default function Home() {
  return (
    <PageWrapper>
      <Tools />
    </PageWrapper>
  );
}
