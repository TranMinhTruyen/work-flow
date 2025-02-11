import { ApiEnum } from '../enums/ApiEnum';
import { FileData, S3FileData } from '../model/FileData';
import { axiosApiEnumFetch, axiosFetch } from '../provider/RootProvider';
import { blobToBase64 } from '../utils/convertUtil';

export const uploadFile = async (fileName: string, fileData?: FileData) => {
  if (!fileName || !fileData) {
    return;
  }

  try {
    const getUrlResponse = await axiosApiEnumFetch(ApiEnum.UPLOAD_FILE, {
      data: {
        fileName: fileName,
      },
    });

    await axiosFetch({
      url: getUrlResponse.data.body.uploadUrl,
      method: 'PUT',
      data: fileData.file,
      headers: {
        'Content-Type': fileData.file?.type,
      },
      isS3Url: true,
    });

    return fileName;
  } catch (error) {
    return error;
  }
};

export const getFile = async (fileName: string): Promise<S3FileData> => {
  const getUrlResponse = await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
    data: {
      fileName: fileName,
    },
  });

  const response = await axiosFetch({
    url: getUrlResponse.data.body.downloadUrl,
    method: 'GET',
    isS3Url: true,
    responseType: 'blob',
  });

  const blob = response.data;

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

export const downloadFile = async (fileName: string): Promise<void> => {
  const getUrlResponse = await axiosApiEnumFetch(ApiEnum.DOWNLOAD_FILE, {
    data: {
      fileName: fileName,
    },
  });

  const response = await axiosFetch({
    url: getUrlResponse.data.body.downloadUrl,
    method: 'GET',
    isS3Url: true,
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
