import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AuthHeaderType = {
  headerContent: ReactNode | ReactElement;
  setHeaderContent: Dispatch<SetStateAction<ReactNode | ReactElement>>;
  headerTitle: string | null;
  setHeaderTitle: Dispatch<SetStateAction<string | null>>;
};

const AuthHeaderContext = createContext<AuthHeaderType>({} as AuthHeaderType);

export const useAuthHeader = () => useContext(AuthHeaderContext);

export const AuthHeaderProvider = ({ children }: { children: ReactElement }) => {
  const [headerContent, setHeaderContent] = useState<ReactNode | ReactElement>(null);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);

  const value: AuthHeaderType = {
    headerContent,
    setHeaderContent,
    headerTitle,
    setHeaderTitle,
  };

  return <AuthHeaderContext.Provider value={value}>{children}</AuthHeaderContext.Provider>;
};
