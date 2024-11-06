import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { Task } from '../types/Task';
import FileManager from '../services/FileManager';

const HomeScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

 useEffect(() => {
    // Dummy-liste med oppgaver
    const dummyTasks: Task[] = [
      { id: 1, text: 'Kjøp melk', timestamp: new Date(), completed: false },
      { id: 2, text: 'Gå tur med hunden', timestamp: new Date(), completed: false },
      { id: 3, text: 'Fullfør prosjekt', timestamp: new Date(), completed: false },
      { id: 4, text: 'Vaske klær', timestamp: new Date(), completed: false },
    ];
    setTasks(dummyTasks);
   // console.log("Dummy tasks set:", dummyTasks);
  }, []);

/*
  // Funksjon for å hente lagrede oppgaver
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await FileManager.loadTodoList();
        setTasks(savedTasks || []); // Sikrer at tasks er en tom liste hvis ingen er lagret
      } catch (error) {
        console.error("Error loading tasks", error);
      }
    };
    loadTasks();
  }, []);
*/
  // Funksjon for å legge til en ny oppgave
  const addTask = async (text: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text,
      completed: false,
      timestamp: new Date(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  //  await FileManager.saveTodoList(updatedTasks); // Lagre til FileManager
  };

  // Funksjon for å toggle oppgave fullført/ufullført
  const toggleTaskCompletion = async (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
   // await FileManager.saveTodoList(updatedTasks); // Lagre til FileManager
  };

  // Funksjon for å slette en oppgave
  const deleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
   // await FileManager.saveTodoList(updatedTasks); // Lagre til FileManager
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.listContainer}>
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={deleteTask}
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
    paddingTop: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
