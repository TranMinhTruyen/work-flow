import { FileType, Obj, SelectDataType } from '../constants/typeConst';
import { IBaseRequest } from '../model/axiosData';

/**
 *
 * @param value
 * @returns
 */
const isNumberArray = (value: any): value is number[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
};

/**
 * Read file and convert to byte array.
 *
 * @param file
 * @returns
 */
export const readFileAsByte = (file: File): Promise<Uint8Array> => {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const byteArray = new Uint8Array(reader.result as ArrayBuffer);
      resolve(byteArray);
    };
  });
};

/**
 *
 * @param file
 * @returns
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const byteArray = reader.result as string;
      resolve(byteArray);
    };
  });
};

/**
 *
 * @param data
 * @returns
 */
export const convertToDataURL = (data?: FileType): Promise<string> => {
  return new Promise(resolve => {
    if (!data) {
      return;
    }

    if (isNumberArray(data)) {
      data = new Uint8Array(data);
    }

    const blob = new Blob([data]);
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    };

    reader.readAsDataURL(blob);
  });
};

/**
 *
 * @param items
 * @param keys
 * @returns
 */
export const toSelectData = (
  items: Obj[],
  keys: { key?: string; value?: string }
): SelectDataType[] =>
  items.map(item => ({
    key: item[keys?.key || 'key'],
    value: item[keys?.value || 'value'],
  }));

export const blobToBase64 = (blob: Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(null);
      }
    };
    reader.onerror = () => {
      reject(null);
    };
    reader.readAsDataURL(blob);
  });
};

export const isIBaseRequest = (obj: any): obj is IBaseRequest => {
  return (
    obj !== undefined &&
    obj !== null &&
    typeof obj === 'object' &&
    ('timestamp' in obj || 'language' in obj || 'payload' in obj) &&
    (obj.timestamp === undefined || typeof obj.timestamp === 'string') &&
    (obj.language === undefined || typeof obj.language === 'string') &&
    (obj.payload === undefined ||
      typeof obj.payload === 'object' ||
      typeof obj.payload === 'string')
  );
};
