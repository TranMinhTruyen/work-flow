/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const noopStorage = {
  getItem: async (key: string) => {
    return null;
  },
  setItem: async (key: string, value: string) => {},
  removeItem: async (key: string) => {},
};

export default noopStorage;
