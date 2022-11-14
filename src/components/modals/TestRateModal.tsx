import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import React, {useCallback} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {redirectToStorePage} from '../../helpers/linkings';

type Props = {
  isVisible: boolean;
  onClose: () => any;
  onRate: () => any;
  navigation: StackNavigationProp<any>;
};

export default function TestRateModal({
  isVisible,
  onClose: closeModal,
  onRate,
  navigation,
}: Props) {
  const onClose = useCallback(() => {
    // Send to backend
    closeModal();
  }, [closeModal]);

  const handleRateUs = useCallback(() => {
    onRate();
    redirectToStorePage();
  }, [onRate]);

  const handleNotYet = useCallback(() => {
    onRate();
    closeModal();
    navigation.navigate('ContactUs');
  }, [closeModal, onRate, navigation]);
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Pressable onPress={onClose}>
            <Image source={require('../../../public/closecross_icon.png')} />
          </Pressable>
        </View>
        <View style={styles.modalBodyWrapper}>
          <Image source={require('../../../public/RateTest.png')} />
          <Text style={styles.modalTitle}>Enjoying RacketPal?</Text>
          <Text style={styles.modalDescription}>
            Your App Store review {'\n'} greatly helps spread the word and
            {'\n'} grow the racket sports community!
          </Text>
          <Pressable style={styles.modalMainButton} onPress={handleRateUs}>
            <Text style={styles.modalMainButtonText}>Rate Us</Text>
          </Pressable>
          <Pressable style={styles.modalFooter} onPress={handleNotYet}>
            <Text style={styles.modalFooterText}>
              Not yet? Give us feedback
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
  },
  modalHeader: {
    alignItems: 'flex-end',
  },
  modalBodyWrapper: {
    alignSelf: 'center',
    width: 327,
    alignItems: 'center',
    paddingTop: 28,
  },
  modalTitle: {
    marginTop: 40,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 16,
  },
  modalMainButton: {
    backgroundColor: '#1FB0F7',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 40,
  },
  modalMainButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  modalFooter: {
    marginTop: 24,
  },
  modalFooterText: {
    fontSize: 14,
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
});
