export interface IS3FileData {
  file?: File;
  name?: string;
  data?: number[];
  base64?: string | null;
}

export interface IUploadFileRequest {
  bucketName: string;
  objectId: string;
}

export interface IUploadFileResponse {
  uploadUrl: string;
}

export interface IDownloadFileRequest {
  bucketName: string;
  objectId: string;
}

export interface IDownloadFileResponse {
  downloadUrl: string;
}
