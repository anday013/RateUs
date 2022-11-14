import {useCallback, useEffect, useState} from 'react';

export const useModal = (initialValue: boolean, trackingState?: boolean) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(initialValue);
  const toggleModal = useCallback(() => {
    setIsModalVisible(prevState => !prevState);
  }, [setIsModalVisible]);
  useEffect(() => {
    if (trackingState !== undefined) {
      setIsModalVisible(trackingState);
    }
  }, [trackingState]);

  return {isModalVisible, setIsModalVisible, toggleModal};
};
