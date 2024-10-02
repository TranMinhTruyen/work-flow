import { CURRENT_PATH } from 'common/constants/commonConst';
import { checkLogin } from 'common/utils/authUtil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSet) return;

    const isLogin = checkLogin();
    const savedPath = sessionStorage.getItem(CURRENT_PATH);

    if (!isLogin) {
      navigate('/auth/login', { replace: true });
      return;
    } else {
      if (savedPath) {
        navigate(savedPath);
      } else {
        navigate('/', { replace: true });
      }
    }
    setIsSet(true);
  }, [isSet, navigate]);

  return <>{isSet && children}</>;
};

export default MainProvider;
