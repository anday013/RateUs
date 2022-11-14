import {useCallback, useEffect, useState} from 'react';
import {ABTestingVariation} from '../helpers/types';
import {getConfig} from '../services/mock';
import {Action, syncABTests} from '../services/testing';

export const useExperiment = () => {
  const [experimentType, setExperimentType] = useState<ABTestingVariation>();

  const isAlreadyRated = useCallback(() => {}, []);

  useEffect(() => {
    (async () => {
      try {
        const config = await getConfig();
        setExperimentType(config.experiment);
        syncABTests(Action.INIT);
      } catch (err) {
        console.log('Err: useExperiment during getting config');
      }
    })();
  }, []);

  const canBeShown = useCallback(async () => {
    switch (experimentType) {
      case ABTestingVariation.Control:
        break;
    }
  }, []);

  const incrementABTest = useCallback(() => {
    syncABTests(Action.SHOWED);
  }, []);

  const rateABTest = useCallback(() => {
    syncABTests(Action.RATED);
  }, []);

  const onExit = useCallback(() => {
    // Send data to backend
  }, []);

  return {experimentType, incrementABTest, rateABTest, onExit};
};
