import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import IGetScreenDetail from '../../model/form/GetScreenDetail';
import IRemoveUserRequest from '../../model/request/RemoveUserRequest';
import ISaveScreenRequest from '../../model/request/SaveScreenRequest';
import IScreenUserRequest from '../../model/request/ScreenUserRequest';
import IRemoveUserResponse from '../../model/response/RemoveUserResponse';
import ISaveScreenResponse from '../../model/response/SaveScreenResponse';
import IScreenUserResponse from '../../model/response/ScreenUserResponse';

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

export const removeUserAction = async (
  screenId?: string,
  listUserId?: string[]
): Promise<IRemoveUserResponse> => {
  const request: IRemoveUserRequest = {
    userAction: store.getState().commonState.loginData?.userName,
    screenId: screenId,
    listUserId: listUserId,
  };

  const response: IRemoveUserResponse = await store
    .dispatch(screenService.endpoints.removeUser.initiate(request))
    .unwrap();

  return response;
};
