import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AuthRole,
  AuthRoleSchema,
  CreateAuthRole,
  UpdateAuthRole
} from "../api/_components/modules/authRule/AuthRoleSchema";
import { Api } from "../app-types";
import { api } from "@/utils/ApiAxiosClient";

export enum AuthRoleQueryKey {
  AuthRoles = "authRoles",
  AuthRole = "authRole"
}

const fetchAuthRoles = async (): Promise<Api.Response<AuthRole[]>> => {
  const response = await api.get<AuthRole[]>("/api/auth-roles");
  return response;
};

const fetchAuthRole = async (id: string): Promise<Api.Response<AuthRole>> => {
  const response = await api.get<AuthRole>(`/api/auth-roles/${id}`);
  return response;
};

export const useAuthRoles = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [AuthRoleQueryKey.AuthRoles],
    queryFn: () => fetchAuthRoles()
  });

  return {
    roles: data?.data?.map((role) => AuthRoleSchema.read.parse(role)) ?? [],
    isLoading,
    isError,
    error
  };
};

export const useAuthRole = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [AuthRoleQueryKey.AuthRole, id],
    queryFn: () => fetchAuthRole(id)
  });

  return {
    role: data?.data,
    isLoading,
    isError,
    error
  };
};

export const useAuthRoleUpdate = () => {
  const { mutateAsync: updateRole, ...rest } = useMutation({
    mutationFn: (role: UpdateAuthRole & Pick<AuthRole, "id">) => {
      return api.put(`/api/auth-roles/${role.id}`, role);
    }
  });

  return {
    updateRole,
    ...rest
  };
};

export const useAuthRoleCreate = () => {
  const { mutateAsync: createRole, ...rest } = useMutation({
    mutationFn: (role: CreateAuthRole) => {
      return api.post("/api/auth-roles", role);
    }
  });

  return {
    createRole,
    ...rest
  };
};

export const useAuthRoleDelete = () => {
  const { mutateAsync: deleteRole, ...rest } = useMutation({
    mutationFn: (id: string) => {
      if (!id) {
        throw new Error("Role ID is required");
      }
      return api.delete(`/api/auth-roles/${id}`, {
        method: "DELETE"
      });
    }
  });

  return {
    deleteRole,
    ...rest
  };
};

export const useAuthRoleAssignToUser = () => {
  const { mutateAsync: assignRoleToUser, ...rest } = useMutation({
    mutationFn: ({ roleId, userId }: { roleId: string; userId: string }) => {
      return api.post(`/api/auth-roles/${roleId}/user-assignment/${userId}`);
    }
  });

  return {
    assignRoleToUser,
    ...rest
  };
};

export const useAuthRoleUnAssignToUser = () => {
  const { mutateAsync: unassignRoleToUser, ...rest } = useMutation({
    mutationFn: ({ roleId, userId }: { roleId: string; userId: string }) => {
      return api.delete(`/api/auth-roles/${roleId}/user-assignment/${userId}`);
    }
  });

  return {
    unassignRoleToUser,
    ...rest
  };
};
