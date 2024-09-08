import baseApi from 'common/api/apiBaseQuery';
import { IUserResponse } from 'model/user/userModel';

const PREFIX = '/user-account';

export const headerService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.mutation<IUserResponse, {}>({
      query: () => ({
        url: `${PREFIX}/get-profile`,
      }),
    }),
  }),
});

export const { useGetProfileMutation } = headerService;
