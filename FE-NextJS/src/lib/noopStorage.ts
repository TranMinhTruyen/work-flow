const noopStorage = {
  getItem: async (key: string) => {
    return null;
  },
  setItem: async (key: string, value: string) => {},
  removeItem: async (key: string) => {},
};

export default noopStorage;
