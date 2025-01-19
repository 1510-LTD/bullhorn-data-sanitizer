import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./hooks/provider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Bullhorn Data Sanitizer",
  description: "Sanitize you data in bullhorn just with a few clicks"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>
          <UserProvider>
            <Toaster position="top-center" />
            <QueryProvider>{children}</QueryProvider>
          </UserProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
