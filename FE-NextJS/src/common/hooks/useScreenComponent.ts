import { useCallback, useState } from 'react';
import { Authorizer, HTMLElement } from '../constants/typeConst';
import { ScreenComponent } from '../model/ScreenMaster';
import { checkAuthorizer } from '../utils/authUtil';

const useScreenComponent = (screenComponentList: ScreenComponent[] = []) => {
  const [conponentList, setComponentList] = useState<ScreenComponent[]>(screenComponentList);

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
    [conponentList]
  );

  const createById = useCallback(
    (componentId: string, component: HTMLElement) => {
      if (checkComponentId(componentId)) {
        return component;
      }
    },
    [checkComponentId]
  );

  const createByAuthorizer = useCallback((authorizer: Authorizer, component: HTMLElement) => {
    if (checkAuthorizer(authorizer)) {
      return component;
    }
  }, []);

  return {
    setComponentList,
    checkComponentId,
    createById,
    createByAuthorizer,
  };
};

export default useScreenComponent;
