import store from 'common/store';
import { IRegisterRequest } from 'model/register/registerModel';
import { registerService } from './registerService';
import { IRegisterForm } from 'model/register/registerForm';
import { encryptWithRSA } from 'common/utils/authUtil';

export const handleSubmitRegister = async (formData: IRegisterForm) => {
  const registerRequest: IRegisterRequest = {
    ...formData,
    password: encryptWithRSA(formData.password),
    image: {
      name: formData?.image?.[0].file?.name,
      data: Array.from(formData?.image?.[0].fileData ?? []),
    },
  };

  const response = await store
    .dispatch(registerService.endpoints.register.initiate(registerRequest))
    .unwrap();

  return response;
};
