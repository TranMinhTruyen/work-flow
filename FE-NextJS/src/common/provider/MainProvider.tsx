'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkLogin } from 'common/utils/authUtil';
import { CURRENT_PATH } from 'common/constants/commonConst';

const MainProvider = ({ children }: { children: React.ReactElement }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isSet) return;

    const isLogin = checkLogin();
    const savedPath = sessionStorage.getItem(CURRENT_PATH);

    // if (!isLogin) {
    //   setTimeout(() => {
    //     router.replace('/login');
    //   }, 5000);
    //   // return;
    // } else {
    //   if (savedPath) {
    //     router.push(savedPath);
    //   } else {
    //     router.replace('/home');
    //   }
    // }
    setIsSet(true);
  }, [isSet, router]);

  return <>{isSet && children}</>;
};

export default MainProvider;
