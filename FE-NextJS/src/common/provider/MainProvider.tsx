import { useEffect, useState } from 'react';
import { checkLogin } from '../utils/authUtil';
import { CURRENT_PATH } from '../constants/commonConst';

const MainProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  // const navigate = useNavigate();

  useEffect(() => {
    if (isSet) return;

    const isLogin = checkLogin();
    const savedPath = sessionStorage.getItem(CURRENT_PATH);

    // if (!isLogin) {
    //   navigate('/auth/login', { replace: true });
    //   return;
    // } else {
    //   if (savedPath) {
    //     navigate(savedPath);
    //   } else {
    //     navigate('/', { replace: true });
    //   }
    // }
    setIsSet(true);
  }, [isSet]);

  return <>{isSet && children}</>;
};

export default MainProvider;
