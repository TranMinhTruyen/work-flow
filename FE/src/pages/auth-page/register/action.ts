import { upload } from '@/common/api/apiS3Object';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';
import { userServices } from '@/services/userService';

import IRegisterForm from './model/RegisterForm';
import IRegisterRequest from './model/RegisterRequest';

export const handleSubmitRegister = async (formData: IRegisterForm) => {
  const data = await upload('workflow', formData.image);

  const registerRequest: IRegisterRequest = {
    ...formData,
    password: encryptWithRSA(formData.password),
    image: data?.objectId,
  };

  const response = await store
    .dispatch(userServices.endpoints.register.initiate(registerRequest))
    .unwrap();

  return response;
};
