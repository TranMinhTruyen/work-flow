import { useEffect } from 'react';

import { CURRENT_PATH } from '@/common/constants/commonConst';
import useRouter from '@/common/hooks/useRouter';

const BackButtonListener = () => {
  const { currentPath } = useRouter();

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
