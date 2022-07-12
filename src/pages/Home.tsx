import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface TaskData {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    setTasks((oldArray) => [
      ...oldArray,
      { id: new Date().getTime(), title: newTaskTitle, done: false },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = [...tasks];
    const taskExists = updatedTask.find((task) => task.id === id);

    if (taskExists) {
      taskExists.done = !taskExists.done;

      setTasks(updatedTask);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const updatedTask = [...tasks];
            const filteredTask = updatedTask.filter((task) => task.id !== id);

            setTasks(filteredTask);
          },
          style: "destructive",
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: TaskData) {
    const updatedTask = [...tasks];
    const taskExists = updatedTask.find((task) => task.id === taskId);

    if (taskExists) {
      taskExists.title = taskNewTitle;

      setTasks(updatedTask);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
