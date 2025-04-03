import { IPageRequest, IPageResponse } from '@/common/model/Pageable';
import store from '@/lib/store';
import { screenService } from '@/services/screenService';

import ISearchScreenRequest from './model/SearchScreenRequest';
import ISearchScreenResponse from './model/SearchScreenResponse';

export const searchAction = async (
  searchCondition?: IPageRequest<ISearchScreenRequest>
): Promise<IPageResponse<ISearchScreenResponse>> => {
  let request: IPageRequest<ISearchScreenRequest> = {
    page: 1,
    size: 10,
    orderList: [],
  };

  if (searchCondition) {
    request = searchCondition;
  }

  const response: IPageResponse<ISearchScreenResponse> = await store
    .dispatch(screenService.endpoints.searchScreen.initiate(request))
    .unwrap();

  return response;
};
