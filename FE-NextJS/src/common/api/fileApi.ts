import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { DATE_TIME_STRING_FORMAT } from '../constants/commonConst';
import { CustomAxiosConfig } from '../constants/typeConst';
import { ApiEnum } from '../enums/ApiEnum';
import { IBaseResponse } from '../model/BaseResponse';
import { FileData, S3FileData } from '../model/FileData';
import {
  IDownloadFileRequest,
  IDownloadFileResponse,
  IUploadFileRequest,
  IUploadFileResponse,
} from '../model/S3Object';
import { axiosApiEnumFetch, axiosFetch } from '../provider/RootProvider';
import { blobToBase64 } from '../utils/convertUtil';
import { randomNumberString } from '../utils/stringUtil';

/**
 * Upload file to S3.
 *
 * @param fileName
 * @param fileData
 * @returns
 */
export const uploadFile = async (
  fileName?: string | null,
  fileData?: FileData | null
): Promise<string | undefined> => {
  if (!fileName || !fileData) return undefined;

  try {
    const objectId = `WFS3-${fileName}-${randomNumberString()}-${dayjs(new Date()).format(DATE_TIME_STRING_FORMAT)}`;
    const getUrlResponse: AxiosResponse<IBaseResponse<IUploadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.UPLOAD_FILE, {
        data: {
          objectId: objectId,
        },
      } as CustomAxiosConfig<IUploadFileRequest>);

    await axiosFetch({
      url: getUrlResponse.data.body.uploadUrl,
      method: 'PUT',
      data: fileData.file,
      headers: {
        'Content-Type': fileData.file?.type,
      },
      isS3Url: true,
    });

    return objectId;
  } catch (error) {
    return error;
  }
};

/**
 * Get file from objectId.
 *
 * @param objectId
 * @returns
 */
export const getFile = async (objectId?: string | null): Promise<S3FileData | null> => {
  if (!objectId) return null;
  const getUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
    await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
      data: {
        objectId: objectId,
      },
    } as CustomAxiosConfig<IDownloadFileRequest>);

  const response = await axiosFetch({
    url: getUrlResponse.data.body.downloadUrl,
    method: 'GET',
    isS3Url: true,
    responseType: 'blob',
  });

  const blob = response.data;
  const fileName = getFileName(objectId);
  const file = new File([blob], fileName, { type: blob.type });

  let data: number[] = [];
  try {
    const arrayBuffer = await blob.arrayBuffer();
    data = Array.from(new Uint8Array(arrayBuffer));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    data = [];
  }

  let base64: string | null = null;
  if (blob.type.startsWith('image/')) {
    try {
      base64 = await blobToBase64(blob);
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
      base64 = null;
    }
  }

  return {
    file,
    name: fileName,
    data,
    base64,
  };
};

/**
 * Download file from objectId.
 *
 * @param objectId
 */
export const downloadFile = async (objectId: string): Promise<void> => {
  const getUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
    await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
      data: {
        objectId: objectId,
      },
    } as CustomAxiosConfig<IDownloadFileRequest>);

  const response = await axiosFetch({
    url: getUrlResponse.data.body.downloadUrl,
    method: 'GET',
    isS3Url: true,
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', getFileName(objectId));
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Download multiple files.
 *
 * @param objectIdList
 */
export const downloadMultipleFiles = async (objectIdList: string[]): Promise<void> => {
  await Promise.all(
    objectIdList.map(async item => {
      await downloadFile(item);
    })
  );
};

/**
 * Get file name from objectId.
 *
 * @param objectId
 * @returns
 */
export const getFileName = (objectId: string) => {
  return objectId.split('-')[1];
};
