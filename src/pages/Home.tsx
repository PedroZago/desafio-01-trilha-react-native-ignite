import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    const updatedTask = [...tasks];
    const filteredTask = updatedTask.filter((task) => task.id !== id);

    setTasks(filteredTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
