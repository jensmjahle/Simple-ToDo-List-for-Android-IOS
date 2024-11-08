
import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import ListManager from '../components/ListManager';
import NewListModal from '../components/NewListModal';
import FileManager from '../services/FileManager';

interface DetailsScreenProps {
  onGoBack: () => void;
  onSelectList: (listName: string) => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ onGoBack, onSelectList }) => {
   const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreateNewList = async (listName: string) => {
      const fileManager = new FileManager();

          // Create an empty task list and save it with the new list name
          await fileManager.writeTaskList(`${listName}.json`, []);

      onSelectList(listName);
      setIsModalVisible(false); // Hide the modal
      onGoBack(); // Go back to HomeScreen
    };

  return (
    <View style={styles.container}>
     <Text style={styles.title}>My To-Do Lists</Text>
      <ListManager
        onSelectList={(listName) => {
          onSelectList(listName);  // Pass the selected list name
          onGoBack();  // Navigate back to HomeScreen
        }}
          onCreateNewList={() => setIsModalVisible(true)} // Show the modal on "Create New List" press
              />
              <NewListModal
                visible={isModalVisible}
                onCreate={handleCreateNewList}
                onCancel={() => setIsModalVisible(false)}
              />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      paddingTop: 16,
    },
});

export default DetailsScreen;
