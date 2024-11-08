import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';
import FileManager from '../services/FileManager';

const generateId = (): number => {
  return Date.now();
};


interface HomeScreenProps {
  selectedListName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ selectedListName }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!selectedListName) return; //Don't load tasks if no list is selected

    // Load tasks when the component mounts
    const loadTasks = async () => {
      const fileManager = new FileManager();  // Initialize FileManager
    const storedTasks = await fileManager.readTaskList(`${selectedListName}.json`);


      if (storedTasks && storedTasks.length > 0) {
            setTasks(storedTasks);
          } else {
            setTasks([]);
          }
        };

        loadTasks();
      }, [selectedListName]);

  // Function to add a new task
  const addTask = async (text: string) => {
    const ID = generateId();
    const newTask: Task = {
        id: ID,
      text,
      completed: false,
      timestamp: new Date(),
    };

console.log('new task ', newTask);
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Save the updated tasks list to file
    const fileManager = new FileManager();
      await fileManager.writeTaskList(`${selectedListName}.json`, updatedTasks);
  };

  // Function to toggle task completion
  const toggleTaskCompletion = async (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Save the updated tasks list to file
    const fileManager = new FileManager();
    await fileManager.writeTaskList(`${selectedListName}.json`, updatedTasks);
  };

  // Function to delete a task
  const deleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Save the updated tasks list to file
    const fileManager = new FileManager();
    await fileManager.writeTaskList(`${selectedListName}.json`, updatedTasks);
  };

 return (
  <View style={styles.container}>
        {selectedListName ? (
          <>
            <Text style={styles.title}>{selectedListName}</Text>
            <View style={styles.listContainer}>
              {tasks.length === 0 ? (
                <Text style={styles.emptyText}>This list has no tasks yet!</Text>
              ) : (
                <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} onDeleteTask={deleteTask} />
              )}
            </View>
            <TaskInput styles={styles.inputContainer} onAddTask={addTask} />
          </>
        ) : (
          <Text style={styles.emptyText}>You need to create or select a to-do list!</Text>
        )}
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

