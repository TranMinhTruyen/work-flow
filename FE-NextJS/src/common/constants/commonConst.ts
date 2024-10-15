import { Accept } from 'react-dropzone';

//#region Axios config
export const TIME_OUT: number = 60000;
//#endregion

//#region File upload type
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
//#endregion

//#region Regex pattern
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
//#endregion

//#region Encrypt PUBLIC KEY
export const PUBLIC_RSA_KEY =
  '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJiJWaAKg7c+D918vcnuLImPJTmCEa+rxGGXzr/XPcYSHcZag0akfL6ZvISVaL62fyACtEKmFD8SNflqBXd0mlcCAwEAAQ==-----END PUBLIC KEY-----';
//#endregion

//#region Redux constant
export const RESET_ALL: string = 'RESET_ALL';
//#endregion

//#region Language
export const languageConst = [
  {
    id: 'EN',
  },
  {
    id: 'VN',
  },
  {
    id: 'JP',
  },
];
//#endregion

//#region
export const CURRENT_PATH: string = 'currentPath';
//#endregion
