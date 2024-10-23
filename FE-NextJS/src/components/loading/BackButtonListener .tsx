'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CURRENT_PATH } from '@/common/constants/commonConst';

const BackButtonListener = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener('popstate', () =>
      sessionStorage.setItem(CURRENT_PATH, window.location.pathname)
    );

    sessionStorage.setItem(CURRENT_PATH, pathname);

    return () => {
      window.removeEventListener('popstate', () => {});
    };
  }, [pathname]);

  return null;
};

export default BackButtonListener;
