import { useCallback, useState } from 'react';

import { Authorizer, CommonElement } from '../constants/typeConst';
import { ScreenComponent } from '../model/ScreenMaster';
import { getLoginData } from '../utils/authUtil';

const useScreenComponent = (screenComponentList: ScreenComponent[] = []) => {
  const [conponentList, setComponentList] = useState<ScreenComponent[]>(screenComponentList);

  const checkAuthorizer = useCallback((authorizer: Authorizer) => {
    const loginData = getLoginData();

    if (!loginData) return false;

    if (!loginData) return false;

    if (authorizer.role && loginData.role && authorizer.role === loginData.role) {
      return true;
    }

    if (
      authorizer.authorities &&
      loginData.authorities &&
      authorizer.authorities.some(item => loginData.authorities?.includes(item))
    ) {
      return true;
    }

    if (authorizer.level && loginData.level && authorizer.level === loginData.level) {
      return true;
    }

    return false;
  }, []);

  const checkComponentId = useCallback(
    (componentId: string) => {
      const component = conponentList.find(item => item.componentId === componentId);

      if (!component) return false;

      return checkAuthorizer({
        role: component.role,
        authorities: component.authorities,
        level: component.level,
      });
    },
    [checkAuthorizer, conponentList]
  );

  const createById = useCallback(
    (componentId: string, component: CommonElement) => {
      if (checkComponentId(componentId)) {
        return component;
      }
    },
    [checkComponentId]
  );

  const createByAuthorizer = useCallback(
    (authorizer: Authorizer, component: CommonElement) => {
      if (checkAuthorizer(authorizer)) {
        return component;
      }
    },
    [checkAuthorizer]
  );

  const createByCondition = useCallback((condition: () => boolean, component: CommonElement) => {
    if (condition()) {
      return component;
    }
  }, []);

  return {
    setComponentList,
    checkComponentId,
    createById,
    createByCondition,
    createByAuthorizer,
  };
};

export default useScreenComponent;
