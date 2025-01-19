"use client";

import React, { useState } from "react";
import { AddIcon, PeopleIcon } from "@/component/icons";
import TopHeading from "@/component/TopHeading";

import { Heading5 } from "@/utils/fonts";
import { Button } from "@/component/button";
import styled from "styled-components";
import { FlexColumnGapWrapper } from "@/utils/styled";
import UsersList from "./usersList";
import AddUser from "./AddUser";
import { useUsers } from "@/app/hooks/useUsers";
import Loading from "@/component/Loading";

const UserManagementPage = () => {
  const { users, isLoading } = useUsers();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <>
      <TopHeading title={"User Management"} icon={<PeopleIcon />} />
      <>
        <TitleBarContainer>
          <FlexColumnGapWrapper $gap="0.25">
            <Heading5>Users</Heading5>
          </FlexColumnGapWrapper>

          <Button
            label="Add New User"
            leadingIcon={<AddIcon />}
            onClick={() => setIsOpen(true)}
          />
        </TitleBarContainer>
      </>

      {!isLoading && users && <UsersList data={users} />}

      {isOpen && <AddUser isOpen={true} onClose={() => setIsOpen(false)} />}
    </>
  );
};

const TitleBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

export default UserManagementPage;
