import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { DATE_TIME_STRING_FORMAT } from '../constants/commonConst';
import { CustomAxiosConfig, FileData } from '../constants/typeConst';
import { ApiEnum } from '../enums/ApiEnum';
import { IBaseResponse } from '../model/BaseResponse';
import {
  IDownloadFileRequest,
  IDownloadFileResponse,
  IS3FileData,
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
export const upload = async (
  bucketName?: string | null,
  fileData?: FileData | null
): Promise<string | null | undefined> => {
  if (!bucketName || !fileData) return undefined;
  try {
    const objectId = `WFS3-${randomNumberString()}-${dayjs(new Date()).format(DATE_TIME_STRING_FORMAT)}-${fileData.name}`;
    const getUrlResponse: AxiosResponse<IBaseResponse<IUploadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.UPLOAD_FILE, {
        data: {
          bucketName: bucketName,
          objectId: objectId,
        },
      } as CustomAxiosConfig<IUploadFileRequest>);

    if (!getUrlResponse.data.body.uploadUrl) return null;

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    return null;
  }
};

/**
 * Get file from objectId.
 *
 * @param objectId
 * @returns
 */
export const get = async (params?: IDownloadFileRequest): Promise<IS3FileData | null> => {
  if (!params) return null;

  try {
    const getUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
        data: params,
      } as CustomAxiosConfig<IDownloadFileRequest>);

    if (!getUrlResponse.data.body.downloadUrl) return null;

    const response = await axiosFetch({
      url: getUrlResponse.data.body.downloadUrl,
      method: 'GET',
      isS3Url: true,
      responseType: 'blob',
    });

    const blob = response.data;
    const fileName = getFileName(params.objectId);
    const file = new File([blob], fileName, { type: blob.type });

    let data: number[] = [];
    try {
      const arrayBuffer = await blob.arrayBuffer();
      data = Array.from(new Uint8Array(arrayBuffer));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (error) {
      data = [];
    }

    let base64: string | null | undefined;
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

/**
 * Download file from objectId.
 *
 * @param objectId
 */
export const download = async (params?: IDownloadFileRequest): Promise<void> => {
  if (!params) return;

  try {
    const getUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
        data: params,
      } as CustomAxiosConfig<IDownloadFileRequest>);

    if (!getUrlResponse.data.body.downloadUrl) return;

    const response = await axiosFetch({
      url: getUrlResponse.data.body.downloadUrl,
      method: 'GET',
      isS3Url: true,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', getFileName(params.objectId));
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return;
  }
};

/**
 * Download multiple files.
 *
 * @param objectIdList
 */
export const downloadMultiple = async (objectIdList?: IDownloadFileRequest[]): Promise<void> => {
  if (!objectIdList) return;
  try {
    await Promise.all(
      objectIdList.map(async item => {
        await download(item);
      })
    );
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return;
  }
};

/**
 * Get file name from objectId.
 *
 * @param objectId
 * @returns
 */
export const getFileName = (objectId: string) => {
  return objectId.split('-')[3];
};
