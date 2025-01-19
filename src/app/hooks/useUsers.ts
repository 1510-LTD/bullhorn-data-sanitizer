import { useMutation, useQuery } from "@tanstack/react-query";

import { Api } from "../app-types";
import { api } from "@/utils/ApiAxiosClient";
import {
  CreateUser,
  UpdateUser,
  User,
  UserSchema
} from "../api/_components/modules/user/UserSchema";

export enum UserQueryKey {
  Users = "Users",
  User = "User"
}

const fetchUsers = async (): Promise<Api.Response<User[]>> => {
  const response = await api.get("/api/users");
  return response;
};

const fetchUser = async (id: string): Promise<Api.Response<User>> => {
  const response = await api.get(`/api/users/${id}`);
  return response;
};

export const useUsers = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [UserQueryKey.Users],
    queryFn: () => fetchUsers()
  });

  return {
    users: data?.data?.map((user) => UserSchema.read.parse(user)) ?? [],
    isLoading,
    isError,
    error
  };
};

export const useUser = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [UserQueryKey.User, id],
    queryFn: () => fetchUser(id)
  });
  const parsedData = UserSchema.read.safeParse(data?.data);

  return {
    user: parsedData.data,
    isLoading,
    isError,
    error
  };
};

export const useGetMe = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [UserQueryKey.User, "me"],
    queryFn: () => api.get("/api/users/me"),
    refetchOnMount: "always"
  });

  return {
    user: data?.data as User,
    isLoading,
    isError,
    error
  };
};

export const useUserUpdate = () => {
  const { mutateAsync: updateUser, ...rest } = useMutation({
    mutationFn: (user: UpdateUser & Pick<User, "id">) => {
      return api.put(`/api/users/${user.id}`, user);
    }
  });

  return {
    updateUser,
    ...rest
  };
};

export const useUserCreate = () => {
  const { mutateAsync: createUser, ...rest } = useMutation({
    mutationFn: (user: CreateUser) => {
      return api.post("/api/users", user);
    }
  });

  return {
    createUser,
    ...rest
  };
};

export const useUserDelete = () => {
  const { mutateAsync: deleteUser, ...rest } = useMutation({
    mutationFn: (id: string) => {
      if (!id) {
        throw new Error("User ID is required");
      }
      return api.delete(`/api/users/${id}`);
    }
  });

  return {
    deleteUser,
    ...rest
  };
};
