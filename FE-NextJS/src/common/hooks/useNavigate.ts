import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { CURRENT_PATH } from '../constants/commonConst';

const useNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

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
