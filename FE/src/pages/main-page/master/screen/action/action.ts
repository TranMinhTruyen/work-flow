import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import store from '@/lib/store';
import { screenService } from '@/services/screenService';
import mockData from '../data/mockData.json';
import { ISearchScreenRequest } from '../model/ScreenRequest';
import { ISearchScreenResponse } from '../model/ScreenResponse';
import { IScreenTableRow } from '../model/Table';

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
