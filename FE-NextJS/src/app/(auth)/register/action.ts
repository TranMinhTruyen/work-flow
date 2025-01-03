import store from '@/lib/store';
import { encryptWithRSA } from '@/common/utils/authUtil';
import { IRegisterForm } from '@/model/register/RegisterForm';
import { IRegisterRequest } from '@/model/register/RegisterModel';
import { registerService } from '@/services/registerService';

export const handleSubmitRegister = async (formData: IRegisterForm) => {
  const registerRequest: IRegisterRequest = {
    ...formData,
    password: encryptWithRSA(formData.password),
    role: 'USER',
    authorities: ['CREATE', 'GET', 'UPDATE'],
    level: 1,
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
