import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.sectionTitle}>How to Use the App</Text>
      <Text style={styles.text}>
        Welcome to the Task Manager app! This guide will help you understand how
        to use the app effectively.
      </Text>
      <Text style={styles.sectionTitle}>Adding a New Task</Text>
      <Text style={styles.text}>
        1. Navigate to the "Add New Task" screen by tapping the "+" button on
        the main screen.
      </Text>
      <Text style={styles.text}>
        2. Fill in the task details including name, category, priority (0-100),
        deadline (in days), and any dependencies.
      </Text>
      <Text style={styles.text}>
        3. Tap the "Add Task" button to save the task.
      </Text>
      <Text style={styles.sectionTitle}>Managing Tasks</Text>
      <Text style={styles.text}>
        - On the main screen, you can view all your tasks. Use the filters to
        narrow down tasks by category, priority, or status.
      </Text>
      <Text style={styles.text}>
        - To update a task's status, use the dropdown menu next to the task.
      </Text>
      <Text style={styles.text}>
        - To remove a task, tap the "Remove" button next to the task.
      </Text>
      <Text style={styles.sectionTitle}>Viewing Overdue Tasks</Text>
      <Text style={styles.text}>
        - Navigate to the "Overdue Tasks" screen to see a list of tasks that are
        past their deadline.
      </Text>
      <Text style={styles.sectionTitle}>Visualizing Dependencies</Text>
      <Text style={styles.text}>
        - Navigate to the "Dependency Graph" screen to see a visual
        representation of task dependencies.
      </Text>
      <Text style={styles.sectionTitle}>Developers</Text>
      <Text style={styles.text}>
        - Deep Das: A passionate software developer with expertise in web and
        mobile application development.
      </Text>
      <Text style={styles.text}>
        - Bodhini Jain: A skilled developer with a focus on creating efficient
        and user-friendly applications.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1F2937",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "#374151",
  },
  text: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
});

export default HelpScreen;
