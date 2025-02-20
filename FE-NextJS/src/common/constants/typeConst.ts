import { AxiosRequestConfig } from 'axios';
import { Dayjs } from 'dayjs';
import { JSX, ReactElement, ReactNode } from 'react';

export type SelectDataType = {
  key: string;
  value?: string;
};

export type Obj<V = any> = { [key: string]: V };

export type ApiType = {
  url: string;
  method: 'POST' | 'GET' | 'UPDATE' | 'DELETE';
};

export type FileType = Uint8Array | number[];

export type FileData = {
  file: File;
  name: string;
  data: number[];
};

export type DateType = Dayjs | string | null;

export type CommonElement = JSX.Element | ReactElement | ReactNode | undefined | null;

export type Authorizer = {
  role?: string;
  authorities?: string[];
  level?: number;
};

export type CustomAxiosConfig<T = any> = AxiosRequestConfig<T> & {
  isS3Url?: boolean;
};
