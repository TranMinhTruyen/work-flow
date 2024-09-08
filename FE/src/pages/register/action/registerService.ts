import baseApi from 'common/api/apiBaseQuery';
import { IRegisterRequest, IRegisterResponse } from 'model/register/registerModel';

const PREFIX = '/user-account';

export const registerService = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: request => ({
        url: `${PREFIX}/create`,
        data: request,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerService;
