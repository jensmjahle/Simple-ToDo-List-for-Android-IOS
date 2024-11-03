import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';

const HomeScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.listContainer}>
   <TaskList
          tasks={tasks}
          onToggleTask={() => {}}
          onDeleteTask={() => {}}
        />
      </View>

        <TaskInput styles={styles.inputContainer} onAddTask={addTask} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 16, // Optional: for some spacing at the top
    height: 50,
  },
  listContainer: {
    flex: 1, // This allows the TaskList to fill the available space
    paddingHorizontal: 16,
  },
  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',

      }
});

export default HomeScreen;
