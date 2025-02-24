import { upload } from '@/common/api/apiS3Object';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';
import { IRegisterForm } from '../model/RegisterForm';
import { IRegisterRequest } from '../model/RegisterModel';
import { registerService } from './registerService';

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
