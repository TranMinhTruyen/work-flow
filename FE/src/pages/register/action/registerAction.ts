import store from 'common/store';
import { IRegisterRequest } from 'model/register/RegisterModel';
import { registerService } from './registerService';
import { IRegisterForm } from 'model/register/RegisterForm';
import { encryptWithRSA } from 'common/authServices';

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
