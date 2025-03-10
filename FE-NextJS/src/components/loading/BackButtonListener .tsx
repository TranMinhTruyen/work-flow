'use client';

import { CURRENT_PATH } from '@/common/constants/commonConst';
import useNavigate from '@/common/hooks/useNavigate';
import { useEffect } from 'react';

const BackButtonListener = () => {
  const { currentPath } = useNavigate();

  useEffect(() => {
    window.addEventListener('popstate', () =>
      sessionStorage.setItem(CURRENT_PATH, window.location.pathname)
    );

    sessionStorage.setItem(CURRENT_PATH, currentPath);

    return () => {
      window.removeEventListener('popstate', () => {});
    };
  }, [currentPath]);

  return <></>;
};

export default BackButtonListener;
