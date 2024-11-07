import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';
import FileManager from '../services/FileManager';  // Import FileManager

const HomeScreen = ({onNavigateToDetails}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isListEmpty, setIsListEmpty] = useState<boolean>(false);  // State to check if no list exists

  useEffect(() => {
    // Load tasks when the component mounts
    const loadTasks = async () => {
      const fileManager = new FileManager();  // Initialize FileManager
      const storedTasks = await fileManager.readTaskList('myTaskList.json');  // Read the first task list from storage

      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
      } else {
        setIsListEmpty(true);  // No list found, set the flag to true
      }
    };

    loadTasks();
  }, []);

  // Function to add a new task
  const addTask = async (text: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text,
      completed: false,
      timestamp: new Date(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Save the updated tasks list to file
    const fileManager = new FileManager();
    await fileManager.writeTaskList('myTaskList.json', updatedTasks);
  };

  // Function to toggle task completion
  const toggleTaskCompletion = async (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Save the updated tasks list to file
    const fileManager = new FileManager();
    await fileManager.writeTaskList('myTaskList.json', updatedTasks);
  };

  // Function to delete a task
  const deleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Save the updated tasks list to file
    const fileManager = new FileManager();
    await fileManager.writeTaskList('myTaskList.json', updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
        <Button title="Go to Task Details" onPress={onNavigateToDetails} />
      <View style={styles.listContainer}>
        {isListEmpty ? (
          // If no list is found, display a message
          <Text style={styles.emptyText}>You need to create a to-do list!</Text>
        ) : (
          // Otherwise, render the list of tasks
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTaskCompletion}
            onDeleteTask={deleteTask}
          />
        )}
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
    paddingTop: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 40,
  },
});

export default HomeScreen;

