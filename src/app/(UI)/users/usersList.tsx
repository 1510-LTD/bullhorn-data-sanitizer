"use client";

import React from "react";
import styled from "styled-components";

import UserCard from "./userCard";
import { FlexColumnGapWrapper } from "@/utils/styled";
import { User } from "@/app/api/_components/modules/user/UserSchema";

type Props = {
  data: User[];
};

const UsersList = ({ data }: Props) => {
  return (
    <Container>
      <FlexColumnGapWrapper $gap={"0.5rem"}>
        {data?.map((user) => <UserCard key={user.id} data={user} />)}
      </FlexColumnGapWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default UsersList;
