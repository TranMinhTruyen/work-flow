import { Accept } from 'react-dropzone';

export const TIME_OUT: number = 60000;

export const IMAGE_FILE_TYPE: Accept = {
  'image/png': ['.jpg'],
};

export const DOC_FILE_TYPE: Accept = {
  'application/msword': ['.docx'],
};

export const EXCEL_FILE_TYPE: Accept = {
  'application/vnd.ms-excel': ['.xlsx'],
};

export const TEXT_FILE_TYPE: Accept = {
  'text/plain': [],
};

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

export const PUBLIC_RSA_KEY =
  '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJiJWaAKg7c+D918vcnuLImPJTmCEa+rxGGXzr/XPcYSHcZag0akfL6ZvISVaL62fyACtEKmFD8SNflqBXd0mlcCAwEAAQ==-----END PUBLIC KEY-----';
