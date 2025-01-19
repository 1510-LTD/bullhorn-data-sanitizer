"use client";

import React from "react";
import PageWrapper from "@/layouts/PageWrapper";
import dynamic from "next/dynamic";

const DuplicateDetectionPage = dynamic(() => import("./duplicateDetection"), {
  ssr: false
});

export default function DuplicateDetection() {
  return (
    <PageWrapper>
      <DuplicateDetectionPage />
    </PageWrapper>
  );
}
