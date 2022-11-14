import {USER_JOINED} from '../services/mock';
import {getObject, isObjectExist, storeObject} from '../services/storage';
import {STORAGE} from './constants';
import {StorageABTestingObjectType} from './types';

export const initRateDataInStorage = async () => {
  if (await isObjectExist(STORAGE.AB_TESTING)) {
    return;
  }
  let data: StorageABTestingObjectType = {
    joinedTime: USER_JOINED,
    numberOfShowedTimes: 0,
    lastSeenTime: 0,
    isRated: false,
  };

  storeObject(STORAGE.AB_TESTING, data);

  return data;
};

export const incrementRateDataInStorage = async () => {
  if (!(await isObjectExist(STORAGE.AB_TESTING))) {
    return initRateDataInStorage();
  }
  let data: StorageABTestingObjectType | null | undefined = await getObject(
    STORAGE.AB_TESTING,
  );
  if (!data) {
    return;
  }

  data = {
    ...data,
    lastSeenTime: Date.now(),
    numberOfShowedTimes: data.numberOfShowedTimes + 1,
  };
  storeObject(STORAGE.AB_TESTING, data);
};

export const canControlVariantBeShown = async () => {
  let data: StorageABTestingObjectType | null | undefined = await getObject(
    STORAGE.AB_TESTING,
  );
  if (!data) {
    return;
  }
  const isShownToday =
    Math.abs(Date.now() - data.lastSeenTime) < 24 * 3600 * 1000;
  return data.numberOfShowedTimes < 3 && !isShownToday;
};

export const isAlreadyRated = async (): Promise<boolean> => {
  let data: StorageABTestingObjectType | null | undefined = await getObject(
    STORAGE.AB_TESTING,
  );
  if (!data || data?.isRated) {
    return false;
  }

  return data.isRated;
};
