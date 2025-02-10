import { AxiosRequestConfig } from 'axios';
import { IBaseResponse } from '../model/BaseResponse';
import { UploadFileRequest, UploadFileResponse } from '../model/File';
import { axiosInstance } from '../provider/RootProvider';

export const uploadFile = async (fileName?: string) => {
  if (!fileName) return null;

  const config: AxiosRequestConfig<UploadFileRequest> = {
    url: '/api/file/get-upload-url',
    method: 'POST',
    data: {
      fileName: fileName,
    },
  };

  const response = await axiosInstance(config);

  const responseData: IBaseResponse<UploadFileResponse> = response.data;

  return responseData.body.uploadUrl;
};
