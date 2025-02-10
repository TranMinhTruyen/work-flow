import { AxiosRequestConfig } from 'axios';
import { CustomAxiosConfig } from '../constants/typeConst';
import { IBaseResponse } from '../model/BaseResponse';
import { UploadFileRequest, UploadFileResponse } from '../model/File';
import { FileData } from '../model/FileData';
import { axiosInstance } from '../provider/RootProvider';

export const uploadFile = async (file?: FileData) => {
  if (!file) return null;

  try {
    const getUrlConfig: AxiosRequestConfig<UploadFileRequest> = {
      url: '/api/file/get-upload-url',
      method: 'POST',
      data: {
        fileName: file.name,
      },
    };

    const getUrlResponse = await axiosInstance(getUrlConfig);

    const getUrlResponseData: IBaseResponse<UploadFileResponse> = getUrlResponse.data;

    const uploadFileConfig: CustomAxiosConfig = {
      url: getUrlResponseData.body.uploadUrl,
      method: 'PUT',
      data: file.file,
      headers: {
        'Content-Type': file.file?.type,
      },
      isFile: true,
    };

    await axiosInstance(uploadFileConfig);

    return file.name;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    return null;
  }
};
