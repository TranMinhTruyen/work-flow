import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CURRENT_PATH } from '../constants/commonConst';

const useRouter = () => {
  const router = useNavigate();
  const location = useLocation();

  const navigate = useCallback(
    (path: string, isReplace: boolean = false) => {
      if (isReplace) {
        window.history.replaceState(null, '', path);
        window.addEventListener('popstate', (event: PopStateEvent) => {
          event.preventDefault();
        });
      }
      router(path, { replace: isReplace });
      sessionStorage.setItem(CURRENT_PATH, path);
    },
    [router]
  );

  return {
    navigate,
    currentPath: location.pathname,
  };
};

export default useRouter;
