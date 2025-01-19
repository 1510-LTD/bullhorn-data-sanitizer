"use client";

import PageWrapper from "@/layouts/PageWrapper";
import dynamic from "next/dynamic";
import React from "react";

const Unauthorized = dynamic(() => import("./no-access"), {
  ssr: false
});

const NoAccess = () => {
  return (
    <PageWrapper>
      <Unauthorized />
    </PageWrapper>
  );
};

export default NoAccess;
