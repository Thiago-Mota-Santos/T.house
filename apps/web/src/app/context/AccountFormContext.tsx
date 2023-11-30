"use client";
import type { ReactNode } from "react";
import React, { useState } from "react";

const AccountFormContext = React.createContext({} as Account);

export interface FormState {
  pixKeyStatus: "success" | "error" | "none";
  pixKey: string;
  descriptionStatus: "success" | "error" | "none";
  description: "";
  valueStatus: "success" | "error" | "none";
  valueMsg: string;
  clientNameStatus: "success" | "error" | "none";
  clientName: string;
}

export interface Account {
  status: FormState;
  setStatus: React.Dispatch<React.SetStateAction<FormState>>;
}

export function AccountFormProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<FormState>({
    pixKeyStatus: "none",
    pixKey: "",
    descriptionStatus: "none",
    description: "",
    clientNameStatus: "none",
    clientName: "",
    valueStatus: "none",
    valueMsg: "",
  });

  return (
    <AccountFormContext.Provider
      value={{
        setStatus,
        status,
      }}
    >
      {children}
    </AccountFormContext.Provider>
  );
}

export function AccountForm() {
  return React.useContext(AccountFormContext);
}
