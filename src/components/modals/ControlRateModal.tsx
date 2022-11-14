import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useCallback, useMemo, useState} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {redirectToStorePage} from '../../helpers/linkings';

type Props = {
  isVisible: boolean;
  onClose: () => any;
  onRate: () => any;
};

export default function ControlRateModal({
  isVisible,
  onClose: closeModal,
  onRate,
}: Props) {
  const [text, setText] = useState<string>('');
  const [isModalExpanded, setIsModalExpanded] = useState<boolean>();
  const onClose = useCallback(() => {
    setText('');
    setIsModalExpanded(false);
    closeModal();
  }, [closeModal]);

  const handleRating = useCallback(
    (numberOfStars: number) => {
      if (numberOfStars > 3) {
        setIsModalExpanded(false);
        onClose();
        redirectToStorePage();
      } else {
        setIsModalExpanded(true);
      }
    },
    [onClose],
  );

  const onSubmit = useCallback(() => {
    //TODO: send text to backend
    onRate();
    onClose();
    redirectToStorePage();
  }, [onRate, onClose]);

  const FeedbackPart = useMemo(
    () => (
      <>
        <Text style={styles.inputTitle}>Any feedback for us?</Text>
        <TextInput
          multiline={true}
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <Pressable style={styles.modalMainButton} onPress={onSubmit}>
          <Text style={styles.modalMainButtonText}>Submit</Text>
        </Pressable>
      </>
    ),
    [text, onSubmit],
  );
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Image source={require('../../../public/Vectorcomment.png')} />
        </View>
        <View style={styles.modalBodyWrapper}>
          <Text style={styles.modalTitle}>Enjoying RacketPal?</Text>
          <Text style={styles.modalDescription}>
            Tap a star to rate it on the App store
          </Text>
          <AirbnbRating
            showRating={false}
            onFinishRating={handleRating}
            starContainerStyle={styles.starContainer}
            defaultRating={0}
          />
          {isModalExpanded ? (
            FeedbackPart
          ) : (
            <Pressable
              style={styles.modalFooter}
              hitSlop={50}
              onPress={onClose}>
              <Text style={styles.modalFooterText}>Remind me later</Text>
            </Pressable>
          )}
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
    paddingVertical: 32,
    paddingHorizontal: 16.5,
    paddingTop: 0,
  },
  modalHeader: {
    alignSelf: 'center',
    top: -20,
    width: 84,
    height: 84,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
  },
  modalBodyWrapper: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 12,
  },
  starContainer: {
    width: 274,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  inputTitle: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    color: '#FFC34E',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  input: {
    height: 112,
    borderRadius: 6,
    borderColor: '#FFC34E',
    borderWidth: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 12,
    lineHeight: 17,
  },
  modalMainButton: {
    backgroundColor: '#FFC34E',
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 16,
  },
  modalMainButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  modalFooter: {
    marginTop: 48,
  },
  modalFooterText: {
    fontSize: 10,
    lineHeight: 15,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#9E9DA2',
  },
});
