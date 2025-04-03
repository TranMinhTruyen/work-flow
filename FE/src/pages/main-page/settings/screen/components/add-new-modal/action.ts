import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import ISaveScreenRequest from '../../model/SaveScreenRequest';
import ISaveScreenResponse from '../../model/SaveScreenResponse';

export const saveAction = async (
  saveScreenRequest: ISaveScreenRequest
): Promise<ISaveScreenResponse> => {
  const response: ISaveScreenResponse = await store
    .dispatch(screenService.endpoints.saveScreen.initiate(saveScreenRequest))
    .unwrap();
  return response;
};
