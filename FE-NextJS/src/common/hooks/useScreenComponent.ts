import { useCallback } from 'react';
import { Authorizer, HTMLElement } from '../constants/typeConst';
import { ScreenComponent } from '../model/ScreenMaster';
import { checkAuthorizer } from '../utils/authUtil';

const useScreenComponent = (screenComponentList: ScreenComponent[]) => {
  const checkComponentId = useCallback(
    (componentId: string) => {
      const component = screenComponentList.find(item => item.componentId === componentId);

      if (!component) return false;

      return checkAuthorizer({
        role: component.role,
        authorities: component.authorities,
        level: component.level,
      });
    },
    [screenComponentList]
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
    checkComponentId,
    createById,
    createByAuthorizer,
  };
};

export default useScreenComponent;
