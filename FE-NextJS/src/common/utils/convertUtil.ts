/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectDataFunc } from '../constants/type';

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
export const convertToDataURL = (data?: Uint8Array | number[]): Promise<string> => {
  return new Promise(resolve => {
    if (data === undefined) {
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
export const toSelectData: SelectDataFunc = (items, keys) =>
  items.map(item => ({
    key: item[keys?.key || 'key'],
    value: item[keys?.value || 'value'],
  }));