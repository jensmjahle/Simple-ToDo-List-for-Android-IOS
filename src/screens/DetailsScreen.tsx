import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface DetailsScreenProps {
  onGoBack: () => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ onGoBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text>Here you can display more information about a selected task.</Text>
      <Button title="Go Back" onPress={onGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DetailsScreen;
