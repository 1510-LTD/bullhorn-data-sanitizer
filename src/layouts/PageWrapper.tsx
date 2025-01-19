"use client";

import Unauthorized from "@/app/(UI)/no-access/no-access";
import { useGetMe } from "@/app/hooks/useUsers";
import { HomeIcon, IconWrapper, LogoutIcon } from "@/component/icons";

import Loading from "@/component/Loading";
import { FlexGapWrapper } from "@/utils/styled";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";

import styled from "styled-components";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { user: loggedInUser, isLoading: userLoading } = useUser();
  const { user, isLoading } = useGetMe();

  if (isLoading || userLoading) {
    return <Loading />;
  }

  if (!loggedInUser) {
    const url = `/api/auth/login`;
    window.location.href = url;
  }

  return (
    <Wrapper>
      <HeaderIconWrapper>
        <IconWrapper>
          <HomeIcon />
          <LogOutButton href="/">Home</LogOutButton>
        </IconWrapper>
        <IconWrapper>
          <LogoutIcon />
          <LogOutButton href="/api/auth/logout">Logout</LogOutButton>
        </IconWrapper>
      </HeaderIconWrapper>

      {isLoading ? (
        <Loading />
      ) : user ? (
        children
      ) : (
        <Unauthorized loggedInUserEmail={loggedInUser?.email} />
      )}
    </Wrapper>
  );
};

export default PageWrapper;

const HeaderIconWrapper = styled(FlexGapWrapper)`
  gap: 1rem;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 5rem 2rem 5rem;
  position: relative;
  min-height: 100vh;
  min-width: 650px;
  scrollbar-gutter: stable;
  overflow: auto;
  flex-grow: 1;

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -20%;
    width: 80%;
    height: 200%;
    background-color: #0095f6;
    border-radius: 50%;
    transform: rotate(-55deg);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 20%;
    width: 300px;
    height: 300px;
    background-image: url("bullhorn-logo.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.75;
    z-index: -1;
    transform: translateY(-50%);
    pointer-events: none;
  }

  & > * {
    position: relative;
  }
`;

const LogOutButton = styled.a`
  text-decoration: none;
  background-color: var(--clr-surfaces-tertiary-1);
  cursor: pointer;

  &:hover {
    color: black;
  }
`;
