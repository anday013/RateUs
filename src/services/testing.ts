import {
  incrementRateDataInStorage,
  initRateDataInStorage,
  onRateSubmitted,
} from '../helpers/rate';
import {RateData} from '../helpers/types';

export enum Action {
  INIT,
  SHOWED,
  RATED,
}

export const syncRateDataStorage = async (
  action: Action,
  data?: RateData,
): Promise<RateData | undefined> => {
  switch (action) {
    case Action.INIT:
      return initRateDataInStorage();
    case Action.SHOWED:
      if (!data) {
        return;
      }
      return incrementRateDataInStorage(data);
    case Action.RATED:
      await onRateSubmitted(data);
      return undefined;
  }
};
