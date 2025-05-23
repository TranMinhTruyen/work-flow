import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { DATE_TIME_STRING_FORMAT } from '../constants/commonConst';
import { CustomAxiosConfig, FileData } from '../constants/typeConst';
import { IBaseResponse } from '../model/AxiosData';
import {
  IDownloadFileResponse,
  IS3FileData,
  IUploadFileResponse,
  S3FileRequest,
} from '../model/S3Object';
import { blobToBase64 } from '../utils/convertUtil';
import { randomNumberString } from '../utils/stringUtil';
import { ApiEnum } from './apiUrl';
import { axiosApiEnumFetch, axiosFetch } from './axios';

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
): Promise<IS3FileData | null | undefined> => {
  if (!bucketName || !fileData) return undefined;
  try {
    const objectId = `WFS3-${randomNumberString()}-${dayjs(new Date()).format(DATE_TIME_STRING_FORMAT)}-${fileData.name}`;
    const getUploadUrlResponse: AxiosResponse<IBaseResponse<IUploadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.UPLOAD_FILE, {
        data: {
          bucketName: bucketName,
          objectId: objectId,
        },
      } as CustomAxiosConfig<S3FileRequest>);

    if (!getUploadUrlResponse.data.body.uploadUrl) return null;

    await axiosFetch({
      url: getUploadUrlResponse.data.body.uploadUrl,
      method: 'PUT',
      data: fileData.file,
      headers: {
        'Content-Type': fileData.file?.type,
      },
      isS3Url: true,
    });

    const getDownloadUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
        data: {
          bucketName: bucketName,
          objectId: objectId,
        },
      } as CustomAxiosConfig<S3FileRequest>);

    return {
      fileData: fileData,
      objectId,
      downloadUrl: getDownloadUrlResponse.data.body.downloadUrl,
      uploadUrl: getUploadUrlResponse.data.body.uploadUrl,
    };
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
export const get = async (params?: S3FileRequest): Promise<IS3FileData | null> => {
  if (!params) return null;

  try {
    const getUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
        data: params,
      } as CustomAxiosConfig<S3FileRequest>);

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
      fileData: {
        file,
        name: fileName,
        data,
      },
      base64,
      objectId: params.objectId,
      downloadUrl: getUrlResponse.data.body.downloadUrl,
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
export const download = async (params?: S3FileRequest): Promise<void> => {
  if (!params) return;

  try {
    const getUrlResponse: AxiosResponse<IBaseResponse<IDownloadFileResponse>> =
      await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
        data: params,
      } as CustomAxiosConfig<S3FileRequest>);

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
export const downloadMultiple = async (objectIdList?: S3FileRequest[]): Promise<void> => {
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
