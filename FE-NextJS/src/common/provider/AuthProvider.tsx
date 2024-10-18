'use client';
import { useEffect, useState } from 'react';
import { checkLogin } from '../utils/authUtil';
import { CURRENT_PATH } from '../constants/commonConst';
import { isNullOrEmpty } from '../utils/stringUtil';
import useNavigate from '../hooks/useNavigate';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useNavigate();

  useEffect(() => {
    const isLogin = checkLogin();

    if (!isLogin) {
      navigate('/login', true);
    } else {
      navigate('/home', true);
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (isSet && !isNullOrEmpty(currentPath)) {
      navigate(currentPath);
      return;
    }

    setIsSet(true);
  }, [isSet, navigate]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
