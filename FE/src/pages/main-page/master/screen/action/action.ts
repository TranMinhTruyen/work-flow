import { IPageRequest, IPageResponse } from '@/common/model/pageable';
import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import mockData from '../data/mockData.json';
import { ISearchScreenRequest } from '../model/screenRequest';
import { ISearchScreenResponse } from '../model/screenResponse';
import { IScreenTableRow } from '../model/table';

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
