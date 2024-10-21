'use client';
import { ReactNode, useEffect, useState } from 'react';
import { checkLogin } from '../utils/authUtil';
import { CURRENT_PATH } from '../constants/commonConst';
import { isNullOrEmpty } from '../utils/stringUtil';
import useNavigate from '../hooks/useNavigate';
import { HOME_URL, LOGIN_URL } from '../constants/urlConst';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useNavigate();

  useEffect(() => {
    const isLogin = checkLogin();

    if (!isLogin) {
      navigate(LOGIN_URL, true);
    } else {
      navigate(HOME_URL, true);
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
