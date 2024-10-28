'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { checkLogin } from '../utils/authUtil';
import { CURRENT_PATH } from '../constants/commonConst';
import { isNullOrEmpty } from '../utils/stringUtil';
import useNavigate from '../hooks/useNavigate';
import { ADMIN_REGISTER_URL, HOME_URL, LOGIN_URL } from '../constants/urlConst';
import { usePathname } from 'next/navigation';
import { useCheckProxyMutation } from '@/services/proxyService';
import { openDialogContainer } from '@/components/dialog/DialogContainer';
import { MessageType } from '../enums/MessageEnum';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const { navigate } = useNavigate();
  const path = usePathname();
  const [checkProxy] = useCheckProxyMutation();

  // Check proxy before going to admin register page
  const handleCheckProxy = useCallback(async () => {
    const clientIp = document.cookie
      .split(';')
      .find(row => row.startsWith('client-ip='))
      ?.split('=')[1];

    return await checkProxy({
      ipAddress:
        process.env.NODE_ENV !== 'production' ? '127.0.0.1' : decodeURIComponent(clientIp ?? ''),
    }).unwrap();
  }, [checkProxy]);

  useEffect(() => {
    const isLogin = checkLogin();

    if (isSet && isLogin) {
      navigate(HOME_URL, true);
    }

    const currentPath = sessionStorage.getItem(CURRENT_PATH);
    if (!isSet && !isNullOrEmpty(currentPath)) {
      navigate(currentPath);
    }

    if (isSet && path === ADMIN_REGISTER_URL) {
      handleCheckProxy().then(resolve => {
        if (resolve.role === 'ADMIN') {
          navigate(path);
        } else {
          openDialogContainer({
            title: 'Alert',
            type: 'message',
            messageType: MessageType.WARN,
            autoClose: true,
            message: "You don't have any permission!",
            onConfirm: () => {
              navigate(LOGIN_URL);
            },
          });
        }
      });
    }

    setIsSet(true);
  }, [handleCheckProxy, isSet, navigate, path]);

  return <>{isSet && children}</>;
};

export default AuthProvider;
