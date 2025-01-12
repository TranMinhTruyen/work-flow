import { IRegisterForm } from '@/app/(auth)/register/model/RegisterForm';
import { IRegisterRequest } from '@/app/(auth)/register/model/RegisterModel';
import { registerService } from '@/app/(auth)/register/service/registerService';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';

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
