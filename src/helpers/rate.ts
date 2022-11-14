import {USER_JOINED} from '../services/mock';
import {getObject, isObjectExist, storeObject} from '../services/storage';
import {DATE, STORAGE} from './constants';
import {RateData, RateTestingVariations} from './types';

export const initRateDataInStorage = async () => {
  if (await isObjectExist(STORAGE.RATE_DATA)) {
    const rateData = await getObject(STORAGE.RATE_DATA);
    return rateData;
  }
  let data: RateData = {
    joinedTime: USER_JOINED,
    numberOfShowedTimes: 0,
    lastSeenTime: 0,
    isRated: false,
  };

  storeObject(STORAGE.RATE_DATA, data);

  return data;
};

export const incrementRateDataInStorage = (data?: RateData) => {
  if (!data) {
    return;
  }

  data = {
    ...data,
    lastSeenTime: Date.now(),
    numberOfShowedTimes: data.numberOfShowedTimes + 1,
  };
  storeObject(STORAGE.RATE_DATA, data);
  return data;
};

export const canRateUsBeShown = (
  data?: RateData,
  experimentType?: RateTestingVariations,
): boolean | undefined => {
  if (!data) {
    return undefined;
  }
  switch (experimentType) {
    case RateTestingVariations.Control:
      return canControlVariantBeShown(data);
    case RateTestingVariations.Test:
      return canTestVariantBeShown(data);
  }
};

export const canControlVariantBeShown = (data: RateData) => {
  const isShownToday =
    Math.abs(Date.now() - data.lastSeenTime) < DATE.DAY_IN_MILLIS;
  return data.numberOfShowedTimes < 3 && !isShownToday && !data.isRated;
};

export const canTestVariantBeShown = (data: RateData) => {
  const isUserFirstMonth =
    Math.abs(Date.now() - data.joinedTime) < 30 * DATE.DAY_IN_MILLIS;

  let isMaximumViewReached = false;
  if (isUserFirstMonth) {
    isMaximumViewReached =
      data.lastSeenTime !== 0
        ? Math.abs(Date.now() - data.lastSeenTime) < 7 * DATE.DAY_IN_MILLIS
        : false;
  } else {
    isMaximumViewReached =
      data.lastSeenTime !== 0
        ? Math.abs(Date.now() - data.lastSeenTime) < 30 * DATE.DAY_IN_MILLIS
        : false;
  }
  return !isMaximumViewReached && !data.isRated;
};

export const isAlreadyRated = (data: RateData | null): boolean => {
  if (!data || data?.isRated) {
    return false;
  }

  return data.isRated;
};

export const onRateSubmitted = async (data?: RateData) => {
  if (!data) {
    return;
  }
  const newData: RateData = {...data, isRated: true};
  return storeObject(STORAGE.RATE_DATA, newData);
};
