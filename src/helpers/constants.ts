import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const APP_STORE_URL = isIOS
  ? 'itms-apps://apps.apple.com/gb/app/racketpal-find-sport-partners/id1453817491'
  : 'market://details?id=com.racketpal';

export const STORAGE = {
  RATE_DATA: 'RATE_DATA',
};

export const DATE = {
  DAY_IN_MILLIS: 24 * 3600 * 1000,
};
