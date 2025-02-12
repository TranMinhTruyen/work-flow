export interface FileData {
  file: File;
  name: string;
  data: number[];
}

export interface S3FileData {
  file?: File;
  name?: string;
  data?: number[];
  base64?: string | null;
}
