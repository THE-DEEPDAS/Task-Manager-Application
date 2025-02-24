import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTaskStore } from "../store/taskStore";
import { format, addDays } from "date-fns";

export function OverdueTasks() {
  const overdueTasks = useTaskStore((state) => state.getOverdueTasks());

  return (
    <ScrollView style={styles.container}>
      {overdueTasks.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No overdue tasks!</Text>
        </View>
      ) : (
        <View style={styles.taskList}>
          <Text style={styles.title}>Overdue Tasks</Text>
          {overdueTasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskName}>{task.task_name}</Text>
              <Text style={styles.taskDue}>
                Due:{" "}
                {format(addDays(new Date(), parseInt(task.deadline)), "PP")}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  noTasksContainer: {
    padding: 16,
    backgroundColor: "#DEF7EC",
    borderRadius: 8,
    margin: 16,
  },
  noTasksText: {
    color: "#057A55",
    fontSize: 16,
  },
  taskList: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#DC2626",
    marginBottom: 16,
  },
  taskItem: {
    backgroundColor: "#FEE2E2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#DC2626",
  },
  taskDue: {
    fontSize: 14,
    color: "#991B1B",
    marginTop: 4,
  },
});

export default OverdueTasks;
