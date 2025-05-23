'use client';

import { ReactNode, useEffect, useState } from 'react';
import { CURRENT_PATH } from '../constants/commonConst';
import { HOME_URL } from '../constants/urlConst';
import useNavigate from '../hooks/useNavigate';
import { checkLogin, handleCheckProxy } from '../utils/authUtil';
import { isNullOrEmpty } from '../utils/stringUtil';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useNavigate();
  const isLogin = checkLogin();

  useEffect(() => {
    const check = async () => {
      handleCheckProxy();
    };

    check();
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate(HOME_URL, true);
    }

    if (isSet) {
      return;
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (!isNullOrEmpty(currentPath)) {
      navigate(currentPath);
    }

    setIsSet(true);
  }, [isLogin, isSet, navigate]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
