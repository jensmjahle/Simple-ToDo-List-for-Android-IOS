
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import FileManager from '../services/FileManager';

type ListManagerProps = {
  onSelectList: (listName: string) => void;
  onCreateNewList: () => void;
};

const ListManager: React.FC<ListManagerProps> = ({ onSelectList, onCreateNewList }) => {
  const [lists, setLists] = useState<string[]>([]);

  // Load lists on component mount
  useEffect(() => {
    const loadLists = async () => {
      const fileManager = new FileManager();
      const availableLists = await fileManager.getAllLists();
      setLists(availableLists);
    };

    loadLists();
  }, []);

  // Function to delete a list
  const deleteList = async (listName: string) => {
    const fileManager = new FileManager();
    await fileManager.deleteList(listName);
    setLists((prevLists) => prevLists.filter((name) => name !== listName));
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.listContainer}>
      <TouchableOpacity onPress={() => onSelectList(item)} style={styles.listTextContainer}>
        <Text style={styles.listText}>{item}</Text>
      </TouchableOpacity>
      <Button title="Delete" color="#FF6347" onPress={() => deleteList(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {lists.length === 0 ? (
        <Text style={styles.emptyText}>No lists available</Text>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      )}
      <Button title="Create New List" onPress={onCreateNewList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listTextContainer: {
    flex: 1,
  },
  listText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ListManager;
