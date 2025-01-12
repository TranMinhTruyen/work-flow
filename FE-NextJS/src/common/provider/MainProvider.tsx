'use client';
import { ReactNode, useEffect, useState } from 'react';
import { CURRENT_PATH } from '../constants/commonConst';
import { LOGIN_URL } from '../constants/urlConst';
import useNavigate from '../hooks/useNavigate';
import { checkLogin } from '../utils/authUtil';
import { isNullOrEmpty } from '../utils/stringUtil';

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useNavigate();

  useEffect(() => {
    const isLogin = checkLogin();

    if (!isLogin) {
      navigate(LOGIN_URL, true);
    }

    if (isSet) {
      return;
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (!isNullOrEmpty(currentPath)) {
      navigate(currentPath);
    }

    setIsSet(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isSet && children}</>;
};

export default MainProvider;
