import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTaskStore } from "../store/taskStore";
import { format, addDays } from "date-fns";

export function ScheduleScreen() {
  const tasks = useTaskStore((state) => state.tasks);

  // Group tasks by deadline
  const groupedTasks = tasks.reduce((acc, task) => {
    const deadline = format(
      addDays(new Date(), parseInt(task.deadline)),
      "yyyy-MM-dd"
    );
    if (!acc[deadline]) {
      acc[deadline] = [];
    }
    acc[deadline].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <ScrollView style={styles.container}>
      {Object.entries(groupedTasks)
        .sort(
          ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime()
        )
        .map(([date, tasksForDate]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>
              {format(new Date(date), "MMMM d, yyyy")}
            </Text>
            {tasksForDate.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.taskName}>{task.task_name}</Text>
                <Text style={styles.taskDetail}>Priority: {task.priority}</Text>
                <Text style={styles.taskDetail}>Status: {task.status}</Text>
              </View>
            ))}
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  dateGroup: {
    marginBottom: 20,
    padding: 16,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  taskDetail: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});

export default ScheduleScreen;
