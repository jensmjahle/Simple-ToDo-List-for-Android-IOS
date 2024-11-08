
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

type NewListModalProps = {
  visible: boolean;
  onCreate: (listName: string) => void;
  onCancel: () => void;
};

const NewListModal: React.FC<NewListModalProps> = ({ visible, onCreate, onCancel }) => {
  const [listName, setListName] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create New List</Text>
          <TextInput
            style={styles.input}
            placeholder="List Name"
            value={listName}
            onChangeText={setListName}
          />
          <View style={styles.buttonContainer}>
            <Button title="Create" onPress={() => { onCreate(listName); setListName(''); }} />
            <Button title="Cancel" onPress={onCancel} color="grey" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewListModal;
