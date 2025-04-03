import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import IGetScreenDetail from '../../model/GetScreenDetail';
import ISaveScreenRequest from '../../model/SaveScreenRequest';
import ISaveScreenResponse from '../../model/SaveScreenResponse';
import IScreenUserRequest from '../../model/ScreenUserRequest';
import IScreenUserResponse from '../../model/ScreenUserResponse';

export const getScreenDetail = async (screenId?: string): Promise<IGetScreenDetail> => {
  const response: IGetScreenDetail = await store
    .dispatch(screenService.endpoints.getScreenDetail.initiate({ screenId: screenId }))
    .unwrap();
  return response;
};

export const getScreenUsers = async (
  searchCondition?: IPageRequest<IScreenUserRequest>
): Promise<IPageResponse<IScreenUserResponse>> => {
  let request: IPageRequest<IScreenUserRequest> = {
    page: 1,
    size: 10,
    orderList: [],
  };

  if (searchCondition) {
    request = searchCondition;
  }

  const response: IPageResponse<IScreenUserResponse> = await store
    .dispatch(screenService.endpoints.getScreenUsers.initiate(request))
    .unwrap();

  return response;
};

export const saveAction = async (
  saveScreenRequest: ISaveScreenRequest
): Promise<ISaveScreenResponse> => {
  const response: ISaveScreenResponse = await store
    .dispatch(screenService.endpoints.saveScreen.initiate(saveScreenRequest))
    .unwrap();
  return response;
};
