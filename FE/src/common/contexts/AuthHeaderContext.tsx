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
};

const AuthHeaderContext = createContext<AuthHeaderType>({} as AuthHeaderType);

export const useAuthHeader = () => useContext(AuthHeaderContext);

export const AuthHeaderProvider = ({ children }: { children: ReactElement }) => {
  const [headerContent, setHeaderContent] = useState<ReactNode | ReactElement>(null);

  const value: AuthHeaderType = {
    headerContent,
    setHeaderContent,
  };

  return <AuthHeaderContext.Provider value={value}>{children}</AuthHeaderContext.Provider>;
};
