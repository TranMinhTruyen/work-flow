import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/lib/store';

import { CURRENT_PATH } from '../constants/commonConst';
import { screenUrl } from '../constants/urlConst';
import { selectScreenMaster } from '../store/commonSlice';

const useRouter = () => {
  const router = useNavigate();
  const location = useLocation();
  const screenMasterList = useAppSelector(selectScreenMaster);

  useEffect(() => {
    const screen = screenMasterList?.find(screen => screen.screenUrl === location.pathname);
    if (screen && !screen.active) {
      router(screen.screenUrl, { replace: false });
      sessionStorage.setItem(CURRENT_PATH, screen.screenUrl);
      throw new Error('404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navigate = useCallback(
    (path: string, isReplace: boolean = false) => {
      if (path === screenUrl.LOGIN.path || path === screenUrl.REGISTER.path) {
        router(path, { replace: isReplace });
        sessionStorage.setItem(CURRENT_PATH, path);
      } else {
        const screen = screenMasterList?.find(screen => screen.screenUrl === path);
        if (screen && screen.active) {
          if (isReplace) {
            window.history.replaceState(null, '', screen.screenUrl);
            window.addEventListener('popstate', (event: PopStateEvent) => {
              event.preventDefault();
            });
          }
          router(screen.screenUrl, { replace: isReplace });
          sessionStorage.setItem(CURRENT_PATH, screen.screenUrl);
        } else {
          throw new Error('404');
        }
      }
    },
    [router, screenMasterList]
  );

  return {
    navigate,
    currentPath: location.pathname,
  };
};

export default useRouter;
