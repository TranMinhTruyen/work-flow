import { useCallback } from 'react';
import { ScreenComponent } from '../model/ScreenMaster';
import { checkAuthorizer } from '../utils/authUtil';
import { HTMLElement } from '../constants/typeConst';

const useScreenComponent = (screenComponentList: ScreenComponent[]) => {
  const checkComponent = useCallback(
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

  const createComponent = useCallback(
    (componentId: string, component: HTMLElement) => {
      if (checkComponent(componentId)) {
        return component;
      }
    },
    [checkComponent]
  );

  return {
    checkComponent,
    createComponent,
  };
};

export default useScreenComponent;
