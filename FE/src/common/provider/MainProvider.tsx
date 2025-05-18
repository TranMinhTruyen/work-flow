import { ReactNode, useEffect, useState } from 'react';

import { CURRENT_PATH } from '../constants/commonConst';
import { screenUrl } from '../constants/urlConst';
import useRouter from '../hooks/useRouter';
import { checkLogin, handleCheckToken, handleGetUserProfile } from '../utils/authUtil';
import { isNullOrEmpty } from '../utils/stringUtil';

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate, currentPath: currentNavigate } = useRouter();

  useEffect(() => {
    if (currentNavigate.includes('/user-detail')) {
      setIsSet(true);
      return;
    }

    if (!checkLogin()) {
      navigate(screenUrl.LOGIN.path, true);
      return;
    }

    if (isSet) return;

    handleCheckToken();

    handleGetUserProfile();

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (!isNullOrEmpty(currentPath)) {
      navigate(currentPath);
    }

    setIsSet(true);
  }, [currentNavigate, isSet, navigate]);

  return <>{isSet && children}</>;
};

export default MainProvider;
