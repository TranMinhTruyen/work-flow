'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkLogin } from '../utils/authUtil';
import { CURRENT_PATH } from '../constants/commonConst';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isSet) return;

    const isLogin = checkLogin();
    const savedPath = sessionStorage.getItem(CURRENT_PATH);

    if (isLogin) {
      router.replace('/');
      return;
    } else {
      if (savedPath) {
        router.push(savedPath);
      } else {
        router.replace('/login');
      }
    }
    setIsSet(true);
  }, [isSet, router]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
