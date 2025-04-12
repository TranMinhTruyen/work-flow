import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import ISaveScreenRequest from '../../model/request/SaveScreenRequest';
import ISaveScreenResponse from '../../model/response/SaveScreenResponse';

export const saveAction = async (
  saveScreenRequest: ISaveScreenRequest
): Promise<ISaveScreenResponse> => {
  const response: ISaveScreenResponse = await store
    .dispatch(screenService.endpoints.saveScreen.initiate(saveScreenRequest))
    .unwrap();
  return response;
};
