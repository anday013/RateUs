import {useCallback, useContext, useEffect, useState} from 'react';
import RateContext from '../contexts/RateContext';
import {canRateUsBeShown} from '../helpers/rate';
import {RateTestingVariations} from '../helpers/types';
import {getConfig} from '../services/mock';
import {Action, syncRateDataStorage} from '../services/testing';

export const useRate = () => {
  const [experimentType, setExperimentType] = useState<RateTestingVariations>();
  const [canBeShown, setCanBeShown] = useState<boolean>(false);
  const {rateData, setRateData} = useContext(RateContext);

  const checkCanBeShown = useCallback(async () => {
    const res = await canRateUsBeShown(rateData, experimentType);
    setCanBeShown(res || false);
  }, [experimentType, rateData]);

  useEffect(() => {
    (async () => {
      const syncedRateData = await syncRateDataStorage(Action.INIT);
      setRateData(syncedRateData);
    })();
  }, [setRateData]);

  useEffect(() => {
    checkCanBeShown();
  }, [checkCanBeShown]);

  useEffect(() => {
    (async () => {
      try {
        const config = await getConfig();
        setExperimentType(config.experiment);
      } catch (err) {
        console.log('Err: useRate during getting config');
      }
    })();
  }, []);

  const incrementRateView = useCallback(async () => {
    const syncedRateData = await syncRateDataStorage(Action.SHOWED, rateData);
    setRateData(syncedRateData);
  }, [setRateData, rateData]);

  const onRate = useCallback(async () => {
    const syncedRateData = await syncRateDataStorage(Action.RATED, rateData);
    setRateData(syncedRateData);

    // Send all necessary data to backend from rateData object alongside with user data
  }, [setRateData, rateData]);

  const onExit = useCallback(() => {
    incrementRateView();
    // Send data to backend
  }, [incrementRateView]);

  return {experimentType, incrementRateView, onRate, onExit, canBeShown};
};
