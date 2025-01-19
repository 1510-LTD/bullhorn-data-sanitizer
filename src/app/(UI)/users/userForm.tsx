"use client";

import React, { useState } from "react";
import { Button } from "@/component/button";
import { ChatIcon } from "@/component/icons";
import { TextField } from "@/component/textField";
import styled from "styled-components";
import { Autocomplete } from "@/component/autocomplete";

import {
  CreateUser,
  User,
  UserSchema
} from "@/app/api/_components/modules/user/UserSchema";
import { notifyError } from "@/component/ErrorToast";

type Props = {
  user?: User;
  onSubmit: (payload: CreateUser) => void;
};

const UserForm = ({ user, onSubmit }: Props) => {
  const [formData, setFormData] = useState<CreateUser>({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName,
    note: user?.note,
    senderEmails: user?.senderEmails ?? [],
    isActive: user?.isActive ?? true,
    email: user?.email ?? "",
    dailyMailingLimit: user?.dailyMailingLimit ?? 0,
    monthlyMailingLimit: user?.monthlyMailingLimit ?? 0
  });

  const setFieldValue = (fieldName: keyof User, value: unknown) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fieldName = e.target.name as keyof User;
    const fieldValue = e.target.value;
    if (fieldValue === "") return undefined;

    setFieldValue(fieldName, fieldValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = UserSchema.create.safeParse(formData);
    if (res.success) onSubmit(res.data);
    else res.error && notifyError(res.error);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="firstName"
        label="First Name"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInput}
      />
      <TextField
        type="text"
        name="lastName"
        label="Last Name"
        placeholder="Last Name"
        value={formData.lastName ?? ""}
        onChange={handleInput}
      />

      <TextField
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInput}
      />

      <TextField
        key={"senders"}
        label="Sender Emails"
        placeholder="Comma separated emails"
        type="email"
        multiple={true}
        value={formData.senderEmails}
        onChange={(e) => {
          setFieldValue("senderEmails", e.target.value.split(","));
        }}
      />

      <TextField
        type="text"
        name="note"
        label="Note"
        placeholder="Note"
        value={formData.note || ""}
        onChange={handleInput}
      />

      <Autocomplete
        key={"isActive"}
        label="Active"
        name="isActive"
        placeholder="Active"
        value={formData.isActive ? "yes" : "no"}
        onChange={(value) => {
          if (value) {
            setFieldValue("isActive", value === "yes" ? true : false);
          }
        }}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]}
      />

      <InlineInputContainer>
        <TextField
          type="number"
          name="dailyMailingLimit"
          label="Daily Mailing Limit"
          placeholder="Daily Mailing Limit"
          value={formData.dailyMailingLimit}
          onChange={handleInput}
        />
        <TextField
          type="number"
          name="monthlyMailingLimit"
          label="Monthly Mailing Limit"
          placeholder="Monthly Mailing Limit"
          value={formData.monthlyMailingLimit}
          onChange={handleInput}
        />
      </InlineInputContainer>

      <Button label="Save" type="submit" leadingIcon={<ChatIcon />} />
    </FormContainer>
  );
};

export default UserForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 400px;
  min-width: 350px;
`;

const InlineInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
