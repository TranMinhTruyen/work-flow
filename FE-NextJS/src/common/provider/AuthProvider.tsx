'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENT_PATH } from '../constants/commonConst';
import { HOME_URL } from '../constants/urlConst';
import { I18nEnum } from '../enums/I18nEnum';
import useNavigate from '../hooks/useNavigate';
import { checkLogin, handleCheckProxy } from '../utils/authUtil';
import { isNullOrEmpty } from '../utils/stringUtil';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useNavigate();
  const { t } = useTranslation(I18nEnum.COMMON_I18N);

  useEffect(() => {
    const isLogin = checkLogin();

    if (isSet && isLogin) {
      navigate(HOME_URL, true);
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (isSet && !isNullOrEmpty(currentPath)) {
      navigate(currentPath);
    }

    if (!isSet) {
      handleCheckProxy();
    }

    setIsSet(true);
  }, [isSet, navigate, t]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
