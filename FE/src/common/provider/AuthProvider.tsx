import { ReactNode, useEffect, useState } from 'react';

import { CURRENT_PATH } from '../constants/commonConst';
import { screenUrl } from '../constants/urlConst';
import useRouter from '../hooks/useRouter';
import { checkLogin } from '../utils/authUtil';
import { isNullOrEmpty } from '../utils/stringUtil';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useRouter();
  const isLogin = checkLogin();

  useEffect(() => {
    if (isLogin) {
      navigate(screenUrl.HOME.path, true);
    }

    if (isSet) {
      return;
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (!isNullOrEmpty(currentPath)) {
      navigate(currentPath === '/' ? screenUrl.LOGIN.path : currentPath);
    }

    setIsSet(true);
  }, [isLogin, isSet, navigate]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
