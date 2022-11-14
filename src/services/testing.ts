import {
  incrementRateDataInStorage,
  initRateDataInStorage,
} from '../helpers/rate';

export enum Action {
  INIT,
  SHOWED,
  RATED,
}

export const syncABTests = async (action: Action) => {
  switch (action) {
    case Action.INIT:
      return initRateDataInStorage();
    case Action.SHOWED:
      return incrementRateDataInStorage();
  }
};
