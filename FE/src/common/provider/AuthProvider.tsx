import { checkLogin } from 'common/utils/authUtil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = checkLogin();
    if (!isLogin) {
      navigate('/auth/login', { replace: true });
      return;
    }
    setIsSet(true);
  }, [navigate]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
