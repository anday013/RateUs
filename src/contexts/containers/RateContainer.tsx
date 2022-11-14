import React, {useCallback, useEffect, useState} from 'react';
import {RateProvider} from '../RateContext';
import {getObject} from '../../services/storage';
import {STORAGE} from '../../helpers/constants';
import {RateData} from '../../helpers/types';

type Props = {
  children: JSX.Element;
};

export default function RateContainer({children}: Props) {
  const [rateData, setRateData] = useState<RateData | undefined>();

  const fetchRateDataFromStorage = useCallback(async () => {
    const rateDataFromStorage = await getObject(STORAGE.RATE_DATA);
    if (rateDataFromStorage) {
      setRateData(rateDataFromStorage);
    }
  }, []);

  useEffect(() => {
    fetchRateDataFromStorage();
  }, [fetchRateDataFromStorage]);
  return (
    <RateProvider
      value={{
        rateData: rateData,
        setRateData,
        fetchRateDataFromStorage,
      }}>
      {children}
    </RateProvider>
  );
}
