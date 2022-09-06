import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
  storeData: async (key: string, value: any) => {
    const stringJsonData = JSON.stringify(value);

    return await AsyncStorage.setItem(key, stringJsonData);
  },
  destroyItem: async (key: string) => {
    return await AsyncStorage.removeItem(key);
  },
  groupItem: async (key: string, value: string) => {
    return await AsyncStorage.mergeItem(key, value);
  },
  getData: async (key: string) => {
    const data = await AsyncStorage.getItem(key);

    if (!data) {
      return;
    }

    const parsedData = JSON.parse(data);
    return parsedData;
  },
};

export default asyncStorage;
