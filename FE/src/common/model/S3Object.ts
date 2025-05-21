import { FileData } from '../constants/typeConst';

export interface IS3FileData {
  fileData?: FileData;
  base64?: string | null;
  objectId?: string;
  downloadUrl?: string;
  uploadUrl?: string;
}

export interface S3FileRequest {
  bucketName: string;
  objectId: string;
}

export interface IUploadFileResponse {
  uploadUrl: string;
}

export interface IDownloadFileResponse {
  downloadUrl: string;
}
