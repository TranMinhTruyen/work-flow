'use client';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  // const navigate = useNavigate();

  useEffect(() => {
    if (isSet) return;

    // const isLogin = checkLogin();
    // const savedPath = sessionStorage.getItem(CURRENT_PATH);

    // if (isLogin) {
    //   navigate('/', { replace: true });
    //   return;
    // } else {
    //   if (savedPath) {
    //     navigate(savedPath);
    //   } else {
    //     navigate('/auth/login', { replace: true });
    //   }
    // }
    setIsSet(true);
  }, [isSet]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
