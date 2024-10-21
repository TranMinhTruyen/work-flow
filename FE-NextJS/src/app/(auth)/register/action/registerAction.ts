import store from '@/common/store';
import { registerService } from './registerService';
import { encryptWithRSA } from '@/common/utils/authUtil';
import { IRegisterForm } from '@/model/register/RegisterForm';
import { IRegisterRequest } from '@/model/register/RegisterModel';

export const handleSubmitRegister = async (formData: IRegisterForm) => {
  const registerRequest: IRegisterRequest = {
    ...formData,
    password: encryptWithRSA(formData.password),
    image: {
      name: formData?.image?.file?.name,
      data: Array.from(formData?.image?.fileData ?? []),
    },
  };

  const response = await store
    .dispatch(registerService.endpoints.register.initiate(registerRequest))
    .unwrap();

  return response;
};
