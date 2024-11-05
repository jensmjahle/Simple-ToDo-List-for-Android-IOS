// src/components/TaskList.tsx
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/Task';

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
 console.log("Tasks in TaskList:", tasks);
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onToggleTask(item.id)} style={styles.taskTextContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" color="#FF6347" onPress={() => onDeleteTask(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks to show</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
  emptyText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TaskList;
