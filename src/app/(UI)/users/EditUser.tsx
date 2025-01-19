"use client";

import React from "react";

import { UpdateUser } from "@/app/api/_components/modules/user/UserSchema";

import UserForm from "./userForm";
import Modal from "@/component/Modal";
import { FlexColumnGapWrapper } from "@/utils/styled";
import { Heading6 } from "@/utils/fonts";
import { UserQueryKey, useUser, useUserUpdate } from "@/app/hooks/useUsers";
import toast from "react-hot-toast";
import { notifyError } from "@/component/ErrorToast";
import { useInvalidateQueryByKeys } from "@/app/hooks/utils";

type Props = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

const EditUser = ({ id, onClose, isOpen }: Props) => {
  const { user, isLoading } = useUser(id);
  const { updateUser } = useUserUpdate();
  const invalidateQuery = useInvalidateQueryByKeys();

  if (!id) return null;
  if (!user) return null;

  const handleSubmit = async (payload: UpdateUser) => {
    try {
      await updateUser({ ...payload, id });
      toast.success(`User "${user.email}" created successfully`);
      invalidateQuery([UserQueryKey.Users]);
      invalidateQuery([UserQueryKey.User, id]);
      onClose();
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    !isLoading && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <FlexColumnGapWrapper $gap="1.5rem">
          <Heading6>Edit User</Heading6>
          <UserForm user={user} onSubmit={handleSubmit} />
        </FlexColumnGapWrapper>
      </Modal>
    )
  );
};

export default EditUser;
