"use client";

import React from "react";
import PageWrapper from "@/layouts/PageWrapper";
import dynamic from "next/dynamic";

const UserManagementPage = dynamic(() => import("./userManagement"), {
  ssr: false
});

export default function EmailTemplate() {
  return (
    <PageWrapper>
      <UserManagementPage />
    </PageWrapper>
  );
}
