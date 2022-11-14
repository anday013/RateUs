import {Alert, Linking} from 'react-native';
import {APP_STORE_URL} from './constants';

export const redirectToStorePage = async () => {
  try {
    if (await Linking.canOpenURL(APP_STORE_URL)) {
      await Linking.openURL(APP_STORE_URL);
    } else {
      Alert.alert(
        'Sorry, the store page could not been opened. Please, try it manually.',
      );
    }
  } catch (err) {
    console.log('ERR: Store page could not been opened');
  }
};
