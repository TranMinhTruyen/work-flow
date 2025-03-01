import { ReactNode, useEffect, useState } from 'react';
import { CURRENT_PATH } from '../constants/commonConst';
import { screenUrl } from '../constants/urlConst';
import useRouter from '../hooks/useRouter';
import { checkLogin, handleCheckToken } from '../utils/authUtil';
import { isNullOrEmpty } from '../utils/stringUtil';

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!checkLogin()) {
      navigate(screenUrl.LOGIN.path, true);
      return;
    }

    if (!isSet && checkLogin()) {
      handleCheckToken();
    }

    if (isSet) {
      return;
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (!isNullOrEmpty(currentPath)) {
      navigate(currentPath);
    }

    setIsSet(true);
  }, [isSet, navigate]);

  return <>{isSet && children}</>;
};

export default MainProvider;
