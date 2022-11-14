import React, {useCallback, useEffect, useState} from 'react';
import {ABTestingVariation} from '../helpers/types';
import {useExperiment} from '../hooks/useExperiment';
import usePrevious from '../hooks/usePrevious';
import ControlRateModal from './modals/ControlRateModal';
import TestRateModal from './modals/TestRateModal';

type Props = {};

const ExperimentRate: React.FC<Props> = ({}) => {
  const {experimentType, incrementABTest, rateABTest, onExit} = useExperiment();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = useCallback(() => {
    setIsModalVisible(prevState => !prevState);
  }, [setIsModalVisible]);

  const prevIsModalVisible = usePrevious(isModalVisible);

  const onClose = useCallback(() => {
    onExit();
    showModal();
  }, [onExit, showModal]);

  useEffect(() => {
    if (prevIsModalVisible === false && isModalVisible) {
      console.log('VIEWED');
      incrementABTest();
    }
  }, [isModalVisible, prevIsModalVisible, incrementABTest]);

  switch (experimentType) {
    case ABTestingVariation.Control:
      return (
        <ControlRateModal
          isVisible={isModalVisible}
          onClose={onClose}
          onRate={rateABTest}
        />
      );

    case ABTestingVariation.Test:
      return (
        <TestRateModal
          isVisible={isModalVisible}
          onClose={onClose}
          onRate={rateABTest}
        />
      );
  }
  return <></>;
};

export default ExperimentRate;
