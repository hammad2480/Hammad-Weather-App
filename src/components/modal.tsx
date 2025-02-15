import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { success } from '../assets/svgs';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../utils/theme';


interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  text: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose, text }) => {
  const theme = useSelector(state => state.theme.mode);
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.modalContainer, { backgroundColor: themeStyles.background }]}>
          <SvgXml xml={success} width={120} height={120} />
          <Text style={styles.modalText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default SuccessModal;
