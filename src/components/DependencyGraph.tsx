import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTaskStore } from "../store/taskStore";

export function DependencyGraph() {
  const tasks = useTaskStore((state) => state.tasks);

  // Create dependency mapping
  const dependencyMap = tasks.reduce((acc, task) => {
    if (task.dependencies !== "None") {
      const deps = task.dependencies.split(",").map((d) => d.trim());
      acc[task.task_name] = deps;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Task Dependencies</Text>
      {Object.keys(dependencyMap).map((taskName) => (
        <View key={taskName} style={styles.dependencyGroup}>
          <Text style={styles.taskName}>{taskName}</Text>
          <View style={styles.dependencies}>
            {dependencyMap[taskName].map((dep) => (
              <View key={dep} style={styles.dependency}>
                <Text style={styles.dependencyText}>↳ {dep}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      {Object.keys(dependencyMap).length === 0 && (
        <Text style={styles.noData}>No dependencies found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  dependencyGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  dependencies: {
    paddingLeft: 16,
  },
  dependency: {
    marginBottom: 4,
  },
  dependencyText: {
    fontSize: 16,
    color: "#6B7280",
  },
  noData: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 24,
  },
});

export default DependencyGraph;
