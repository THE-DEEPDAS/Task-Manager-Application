import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.sectionTitle}>How to Run the App</Text>
      <Text style={styles.text}>
        1. Ensure you have Node.js and npm installed on your machine.
      </Text>
      <Text style={styles.text}>
        2. Clone the repository to your local machine.
      </Text>
      <Text style={styles.text}>
        3. Navigate to the project directory and run `npm install` to install
        dependencies.
      </Text>
      <Text style={styles.text}>
        4. Run `npm start` to start the development server.
      </Text>
      <Text style={styles.text}>
        5. Use an emulator or a physical device to run the app.
      </Text>
      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.text}>
        - Add new tasks with a name, category, priority, deadline, and
        dependencies.
      </Text>
      <Text style={styles.text}>
        - View and manage tasks, including updating their status and removing
        them.
      </Text>
      <Text style={styles.text}>- View a dependency graph of tasks.</Text>
      <Text style={styles.text}>- View overdue tasks.</Text>
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
