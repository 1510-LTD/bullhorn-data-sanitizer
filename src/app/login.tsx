"use client";

import { Button } from "@/component/button";
import { PeopleIcon } from "@/component/icons";
import { styled } from "styled-components";

export const openPopup = (
  url: string,
  name: string,
  width = 500,
  height = 600
) => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const popup = window.open(
    url,
    name,
    `width=${width},height=${height},top=${top},left=${left}`
  );

  if (!popup) {
    throw new Error("Popup blocked. Please enable popups and try again.");
  }

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        reject(new Error("Popup was closed by the user"));
      }

      try {
        if (popup.location.href.includes("callback")) {
          clearInterval(timer);
          popup.close();
          resolve("Login successful");
        }
      } catch (error) {
        // Ignore cross-origin errors until we reach the same origin
      }
    }, 5000);
  });
};

export default function PopupLogin() {
  const handleLogin = async () => {
    try {
      const url = `/api/auth/login?returnTo=/callback`;
      await openPopup(url, "Login");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginPageWrapper>
      <Button leadingIcon={<PeopleIcon />} onClick={handleLogin}>
        Login
      </Button>
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  gap: 2rem;
`;
