import { Dayjs } from 'dayjs';
import { JSX, ReactElement } from 'react';

export type SelectDataType = {
  key: string;
  value?: string;
};

export type Obj<V = any> = { [key: string]: V };

export type ApiType = {
  url: string;
  method: 'POST' | 'GET' | 'UPDATE' | 'DELETE';
};

export type FileType = Blob | ArrayBuffer | Uint8Array | Uint16Array | number[] | null;

export type DateType = Dayjs | string | null;

export type HTMLElement = JSX.Element | ReactElement | undefined | null;

export type Authorizer = {
  role?: string;
  authorities?: string[];
  level?: number;
};
