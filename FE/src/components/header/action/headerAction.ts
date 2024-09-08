import store from 'common/store';
import { IUserResponse } from 'model/user/userModel';
import { headerService } from './headerService';
import { setUserInfo } from 'common/commonSlice';

export const getUserInfo = async () => {
  const response: IUserResponse = await store
    .dispatch(headerService.endpoints.getProfile.initiate({}))
    .unwrap();

  store.dispatch(setUserInfo(response));
};
