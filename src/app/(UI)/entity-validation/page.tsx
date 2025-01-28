"use client";

import React from "react";
import PageWrapper from "@/layouts/PageWrapper";
import dynamic from "next/dynamic";

const EntityValidationPage = dynamic(() => import("./entityValidation"), {
  ssr: false
});

export default function EntityValidation() {
  return (
    <PageWrapper>
      <EntityValidationPage />
    </PageWrapper>
  );
}
