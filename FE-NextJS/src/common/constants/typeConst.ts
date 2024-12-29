/* eslint-disable no-unused-vars */
export type SelectDataType = {
  key: string;
  value?: string;
};

export type FileInputData = {
  file?: File;
  fileData?: Uint8Array | number[];
};

export type FileData = {
  name?: string;
  data?: number[];
};

export type Obj<V = any> = { [key: string]: V };

export type SelectDataFunc = (
  items: Obj[],
  keys: { key?: string; value?: string }
) => SelectDataType[];

export type ApiType = {
  url: string;
  method: 'POST' | 'GET' | 'UPDATE' | 'DELETE';
};

export type DateType = Date | string | null;
