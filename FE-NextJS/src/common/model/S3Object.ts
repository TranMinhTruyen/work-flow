export interface IUploadFileRequest {
  objectId: string;
}

export interface IUploadFileResponse {
  uploadUrl: string;
}

export interface IDownloadFileRequest {
  objectId: string;
}

export interface IDownloadFileResponse {
  downloadUrl: string;
}
