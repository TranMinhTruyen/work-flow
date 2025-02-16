'use client';

import { CURRENT_PATH } from '@/common/constants/commonConst';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

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
};

export default BackButtonListener;
