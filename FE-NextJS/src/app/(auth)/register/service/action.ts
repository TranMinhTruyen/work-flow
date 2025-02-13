import { IRegisterForm } from '@/app/(auth)/register/model/RegisterForm';
import { IRegisterRequest } from '@/app/(auth)/register/model/RegisterModel';
import { registerService } from '@/app/(auth)/register/service/registerService';
import { upload } from '@/common/api/apiS3Object';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';

export const handleSubmitRegister = async (formData: IRegisterForm) => {
  const objectId = await upload('workflow', formData.image);

  const registerRequest: IRegisterRequest = {
    ...formData,
    password: encryptWithRSA(formData.password),
    role: 'USER',
    authorities: ['CREATE', 'GET', 'UPDATE'],
    level: 1,
    image: objectId,
  };

  const response = await store
    .dispatch(registerService.endpoints.register.initiate(registerRequest))
    .unwrap();

  return response;
};
