import { checkLogin } from 'common/utils/authUtil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSet) return;

    const isLogin = checkLogin();
    const savedPath = sessionStorage.getItem('currentPath');

    if (isLogin) {
      navigate('/', { replace: true });
      return;
    } else {
      if (savedPath) {
        navigate(savedPath);
      } else {
        navigate('/auth/login', { replace: true });
      }
    }
    setIsSet(true);
  }, [isSet, navigate]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
