import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTaskStore } from "../store/taskStore";
import { Task, TaskFilters } from "../types";
import { format, addDays } from "date-fns";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function TaskListScreen({ navigation }: any) {
  const [filters, setFilters] = useState<TaskFilters>({
    status: "All",
  });

  const tasks = useTaskStore((state) => state.getTasks(filters));
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const removeTask = useTaskStore((state) => state.removeTask);

  const handleStatusChange = async (
    taskName: string,
    status: Task["status"]
  ) => {
    try {
      await updateTaskStatus(taskName, status);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const handleRemoveTask = async (taskName: string) => {
    Alert.alert("Remove Task", "Are you sure you want to remove this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            await removeTask(taskName);
          } catch (error) {
            Alert.alert(
              "Error",
              error instanceof Error ? error.message : "An error occurred"
            );
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskName}>{item.task_name}</Text>
        <TouchableOpacity
          onPress={() => handleRemoveTask(item.task_name)}
          style={styles.removeButton}
        >
          <Icon name="delete" size={24} color="#DC2626" />
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.priority}>Priority: {item.priority}</Text>
      <Text style={styles.deadline}>
        Due: {format(addDays(new Date(), parseInt(item.deadline)), "PP")}
      </Text>

      {item.dependencies !== "None" && (
        <Text style={styles.dependencies}>
          Dependencies: {item.dependencies}
        </Text>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <View style={styles.statusButtons}>
          {(
            ["Not Started", "In Progress", "Completed"] as Task["status"][]
          ).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                item.status === status && styles.statusButtonActive,
              ]}
              onPress={() => handleStatusChange(item.task_name, status)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  item.status === status && styles.statusButtonTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("OverdueTasks")}
        >
          <Text style={styles.navButtonText}>Overdue Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("DependencyGraph")}
        >
          <Text style={styles.navButtonText}>Dependency Graph</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("DeveloperInfo")}
        >
          <Text style={styles.navButtonText}>Developer Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Scheduler")}
        >
          <Text style={styles.navButtonText}>Scheduler</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Icon name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  listContent: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  removeButton: {
    padding: 4,
  },
  category: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  priority: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  deadline: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  dependencies: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  statusButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 4,
  },
  statusButtonActive: {
    backgroundColor: "#3B82F6",
  },
  statusButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "#4B5563",
  },
  statusButtonTextActive: {
    color: "#FFFFFF",
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  navigationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    justifyContent: "space-evenly",
    marginBottom: 8,
  },
  navButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
