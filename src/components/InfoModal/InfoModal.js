import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const InfoModal = ({openInfoModal, setOpenInfoModal}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openInfoModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setOpenInfoModal(!openInfoModal);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>How to draw the polygon?</Text>
          <Text style={styles.modalText}>1. Tap "Draw Polygon" to begin.</Text>
          <Text style={styles.modalText}>
            2. Tap on the map to start drawing points.
          </Text>
          <Text style={styles.modalText}>
            3. Tap consecutive points on the map to create the polygon.
          </Text>
          <Text style={styles.modalText}>
            4. Tap "Finish Drawing" to complete the polygon.
          </Text>
          <Text style={styles.modalText}>
            5. Tap "Erase Last Point" to remove the last drawn point.
          </Text>
          <Text style={styles.modalText}>
            6. Tap "Erase Whole Polygon" to clear the entire polygon.
          </Text>
          <Text style={styles.modalText}>
            7. You won't be able to edit/erase the whole polygon or last point
            once "Finish Drawing" is clicked!
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setOpenInfoModal(!openInfoModal)}>
            <Text style={styles.buttonText}>Got It</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: 10,
  },
  buttonClose: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoModal;
