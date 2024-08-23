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
