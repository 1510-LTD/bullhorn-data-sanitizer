"use client";

import PageWrapper from "@/layouts/PageWrapper";
import { Heading5 } from "@/utils/fonts";
import { FlexColumnGapWrapper } from "@/utils/styled";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageWrapper>
      <center>
        <FlexColumnGapWrapper $gap="2rem">
          <Heading5>404 - Page Not Found</Heading5>
          <Link href="/">Return Home</Link>
        </FlexColumnGapWrapper>
      </center>
    </PageWrapper>
  );
}
