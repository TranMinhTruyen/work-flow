import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { CURRENT_PATH } from '../constants/commonConst';

const useNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handlePopState = () => {
      sessionStorage.setItem(CURRENT_PATH, pathname);
    };

    // Lắng nghe sự kiện popstate
    window.addEventListener('popstate', handlePopState);

    return () => {
      // Hủy bỏ event listener khi component bị unmount
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  const navigate = useCallback(
    (path: string, isReplace: boolean = false) => {
      if (isReplace) {
        router.replace(path);
      } else {
        router.push(path);
      }
      sessionStorage.setItem(CURRENT_PATH, path);
    },
    [router]
  );

  return {
    navigate,
    currentPath: pathname,
  };
};

export default useNavigate;
