import Modal from "@/component/Modal";

import { notifyError } from "@/component/ErrorToast";
import {
  AuthRoleQueryKey,
  useAuthRole,
  useAuthRoleAssignToUser,
  useAuthRoleUnAssignToUser
} from "@/app/hooks/useAuthRoles";

import { useInvalidateQueryByKeys } from "@/app/hooks/utils";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Autocomplete } from "@/component/autocomplete";
import { getConcatedUserName } from "@/utils/converter";
import { Button } from "@/component/button";
import styled from "styled-components";
import { useUsers } from "@/app/hooks/useUsers";
import { Heading6 } from "@/utils/fonts";

type Props = {
  roleId: string;
  onClose: () => void;
};

const AssignRoleToUser = ({ roleId, onClose }: Props) => {
  const { role } = useAuthRole(roleId);
  const { users, isLoading } = useUsers();

  useEffect(() => {
    if (role) {
      // setSelectedUsers(role.users.map((u) => u.id));
    }
  }, [role]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>();
  const { assignRoleToUser } = useAuthRoleAssignToUser();
  const { unassignRoleToUser } = useAuthRoleUnAssignToUser();
  const invalidateQuery = useInvalidateQueryByKeys();

  const handleSubmit = async () => {
    try {
      for (const userId of selectedUsers ?? [])
        await assignRoleToUser({ roleId, userId });

      for (const userId of []) unassignRoleToUser({ roleId, userId });

      toast.success(
        `Role "${role?.title}" has been reassigned to users successfully`
      );
      invalidateQuery([AuthRoleQueryKey.AuthRoles]);
      onClose();
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <>
      {!isLoading && (
        <Modal isOpen={true} onClose={onClose}>
          <Container>
            <Heading6>Assign Role To Users</Heading6>

            <Autocomplete
              key={"user"}
              label="Assigned Users"
              name="Assigned Users"
              multiple={true}
              value={selectedUsers}
              onChange={(value) => {
                if (value) {
                  setSelectedUsers(value as any);
                }
              }}
              options={[
                ...users.map((u) => ({
                  value: u.id,
                  label: getConcatedUserName(u)
                }))
              ]}
            />
            <Button onClick={handleSubmit}>Save</Button>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default AssignRoleToUser;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 350px;
`;
