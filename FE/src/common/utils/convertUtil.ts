import { SelectDataFunc } from 'common/constants/type';

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

export const toSelectData: SelectDataFunc = (items, keys) =>
  items.map(item => ({
    key: item[keys?.key || 'key'],
    value: item[keys?.value || 'value'],
  }));
