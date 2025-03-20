import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import mockData from '../data/mockData.json';
import IGetScreenDetail from '../model/GetScreenDetail';
import ISaveScreenRequest from '../model/SaveScreenRequest';
import ISaveScreenResponse from '../model/SaveScreenResponse';
import IScreenTableRow from '../model/ScreenTableRow';
import ISearchScreenRequest from '../model/SearchScreenRequest';
import ISearchScreenResponse from '../model/SearchScreenResponse';

export const initMockData = () => {
  const data: IScreenTableRow[] = mockData.map(item => ({ ...item }));
  return data;
};

export const searchAction = async (
  searchCondition?: IPageRequest<ISearchScreenRequest>
): Promise<IPageResponse<ISearchScreenResponse[]>> => {
  let request: IPageRequest<ISearchScreenRequest> = {
    page: 0,
    size: 10,
    orderList: [],
  };

  if (searchCondition) {
    request = searchCondition;
  }

  const response: IPageResponse<ISearchScreenResponse[]> = await store
    .dispatch(screenService.endpoints.searchScreen.initiate(request))
    .unwrap();

  return response;
};

export const getScreenDetail = async (screenId?: string): Promise<IGetScreenDetail> => {
  const response: IGetScreenDetail = await store
    .dispatch(screenService.endpoints.getScreenDetail.initiate({ screenId: screenId }))
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
