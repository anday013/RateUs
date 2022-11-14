import React from 'react';
import {RateData} from '../helpers/types';

type InitStateType = {
  rateData?: RateData;
  fetchRateDataFromStorage: () => any;
  setRateData: (a?: RateData) => any;
};
const initState: InitStateType = {
  rateData: undefined,
  fetchRateDataFromStorage: () => {},
  setRateData: () => {},
};

const RateContext = React.createContext(initState);

export const RateProvider = RateContext.Provider;
export default RateContext;
