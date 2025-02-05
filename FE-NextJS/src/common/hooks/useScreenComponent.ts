import { useCallback } from 'react';
import { ScreenComponent } from '../model/ScreenMaster';
import { checkAuthorizer } from '../utils/authUtil';

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

  return {
    checkComponent,
  };
};

export default useScreenComponent;
