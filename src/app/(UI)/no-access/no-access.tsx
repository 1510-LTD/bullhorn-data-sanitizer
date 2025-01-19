"use client";

import { WarningCircleIcon } from "@/component/icons";

import styled from "styled-components";

const Header = styled.h2`
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  max-width: 32rem;
  p,
  h2 {
    color: var(--text-white);
  }
  & > div {
    width: 100%;
  }
`;

const DescriptionContainer = styled.div`
  & > p {
    font-size: var(--fs-3);
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HyperLink = styled.a`
  color: var(--text-white);
  text-decoration: underline;
  cursor: pointer;
`;

const Unauthorized = ({
  loggedInUserEmail = "XXXXXXXXXXX@XXXX.XXX"
}: {
  loggedInUserEmail?: string | null;
}) => {
  return (
    <Container>
      <DescriptionContainer>
        <Header>
          <WarningCircleIcon />
          Access Denied
        </Header>
        <p>
          You&apos;re signed in as {loggedInUserEmail}, but this user is not
          allowed to access this app.
        </p>
        <p>
          To get access, please contact a your administrator or Karen Somal at
          karen@plac-d.com.
        </p>
        <p>
          To log out, click <HyperLink href="/api/auth/logout">here</HyperLink>.
        </p>
      </DescriptionContainer>
    </Container>
  );
};

export default Unauthorized;
