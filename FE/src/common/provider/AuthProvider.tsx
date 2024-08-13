import { checkLogin } from 'common/authServices';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);

  useEffect(() => {
    const isLogin = checkLogin();
    if (!isLogin) {
      window.location.replace('/auth/login');
      return;
    }
    setIsSet(true);
  }, []);

  return <>{isSet && children}</>;
};

export default AuthProvider;
