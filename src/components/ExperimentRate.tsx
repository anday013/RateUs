import React, {useCallback} from 'react';
import {RateTestingVariations} from '../helpers/types';
import {useRate} from '../hooks/useRate';
import ControlRateModal from './modals/ControlRateModal';
import TestRateModal from './modals/TestRateModal';
import {useModal} from '../hooks/useModal';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ExperimentRate: React.FC<Props> = ({navigation}) => {
  const {experimentType, onRate, onExit, canBeShown} = useRate();
  const {isModalVisible, toggleModal} = useModal(false, canBeShown);

  const onClose = useCallback(() => {
    onExit();
    toggleModal();
  }, [onExit, toggleModal]);

  switch (experimentType) {
    case RateTestingVariations.Control:
      return (
        <ControlRateModal
          isVisible={isModalVisible}
          onClose={onClose}
          onRate={onRate}
        />
      );

    case RateTestingVariations.Test:
      return (
        <TestRateModal
          isVisible={isModalVisible}
          onClose={onClose}
          onRate={onRate}
          navigation={navigation}
        />
      );
  }
  return <></>;
};

export default ExperimentRate;
