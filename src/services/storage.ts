import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Async storage store object error: ', e);
  }
};

export const getObject = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Async storage read object error: ', e);
  }
};

export const isObjectExist = async (key: string): Promise<boolean> =>
  !!(await getObject(key));

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('Err: Async storage error during clear process:', e);
  }
};
