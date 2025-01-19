import { notifyError } from "@/component/ErrorToast";
import Modal from "@/component/Modal";

import { Heading6 } from "@/utils/fonts";
import { FlexColumnGapWrapper } from "@/utils/styled";
import toast from "react-hot-toast";
import { useInvalidateQueryByKeys } from "@/app/hooks/utils";
import UserForm from "./userForm";
import { CreateUser } from "@/app/api/_components/modules/user/UserSchema";
import { UserQueryKey, useUserCreate } from "@/app/hooks/useUsers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddUser = ({ isOpen, onClose }: Props) => {
  const { createUser } = useUserCreate();
  const invalidateQuery = useInvalidateQueryByKeys();

  const handleSubmit = async (payload: CreateUser) => {
    try {
      await createUser(payload);
      toast.success(`User "${payload.email}" created successfully`);
      invalidateQuery([UserQueryKey.Users]);
      onClose();
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FlexColumnGapWrapper $gap="1.5rem">
        <Heading6>Create new user</Heading6>
        <UserForm onSubmit={handleSubmit} />
      </FlexColumnGapWrapper>
    </Modal>
  );
};

export default AddUser;
