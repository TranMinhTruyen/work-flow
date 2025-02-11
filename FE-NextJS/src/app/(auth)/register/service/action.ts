import { IRegisterForm } from '@/app/(auth)/register/model/RegisterForm';
import { IRegisterRequest } from '@/app/(auth)/register/model/RegisterModel';
import { registerService } from '@/app/(auth)/register/service/registerService';
import { downloadFile, uploadFile } from '@/common/api/fileApi';
import { encryptWithRSA } from '@/common/utils/authUtil';
import store from '@/lib/store';

export const handleSubmitRegister = async (formData: IRegisterForm) => {
  const registerRequest: IRegisterRequest = {
    ...formData,
    password: encryptWithRSA(formData.password),
    role: 'USER',
    authorities: ['CREATE', 'GET', 'UPDATE'],
    level: 1,
    image: formData?.image,
  };

  const response = await store
    .dispatch(registerService.endpoints.register.initiate(registerRequest))
    .unwrap();

  if (response && response.imagePath) {
    await uploadFile(response.imagePath, formData.image);
  }

  if (response && response.imagePath) {
    await downloadFile(response.imagePath);
  }

  return response;
};
