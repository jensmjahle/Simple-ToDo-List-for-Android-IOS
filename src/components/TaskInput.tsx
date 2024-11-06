import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

type TaskInputProps = {
  onAddTask: (taskText: string) => void;
};

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');  // Clear input field
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={handleAddTask} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
    flex: 1,

  },
  buttonContainer: {
    width: 80,
    justifyContent: 'center'
  },
});

export default TaskInput;
