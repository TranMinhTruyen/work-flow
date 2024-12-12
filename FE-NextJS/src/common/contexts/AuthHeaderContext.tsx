'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type AuthHeaderType = {
  headerContent: ReactNode;
  setHeaderContent: Dispatch<SetStateAction<ReactNode>>;
  headerTitle: string | null;
  setHeaderTitle: Dispatch<SetStateAction<string | null>>;
};

const AuthHeaderContext = createContext<AuthHeaderType>({} as AuthHeaderType);

export const AuthHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);

  const value: AuthHeaderType = {
    headerContent,
    setHeaderContent,
    headerTitle,
    setHeaderTitle,
  };

  return <AuthHeaderContext value={value}>{children}</AuthHeaderContext>;
};

export const useAuthHeader = () => useContext(AuthHeaderContext);
