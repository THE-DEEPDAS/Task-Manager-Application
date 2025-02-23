import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTaskStore } from "../store/taskStore";
import { TaskFormData } from "../types";

export function AddTaskScreen({ navigation }: any) {
  const [formData, setFormData] = useState<TaskFormData>({
    task_name: "",
    category: "",
    priority: 1,
    deadline: "1",
    dependencies: "",
  });

  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);

  const handleSubmit = async () => {
    try {
      await addTask(formData);
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const handlePriorityChange = (text: string) => {
    const num = parseInt(text);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setFormData((prev) => ({ ...prev, priority: num }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Task Name</Text>
            <TextInput
              style={styles.input}
              value={formData.task_name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, task_name: text }))
              }
              placeholder="Enter task name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              value={formData.category}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, category: text }))
              }
              placeholder="Enter category"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Priority (0-100)</Text>
            <TextInput
              style={styles.input}
              value={formData.priority.toString()}
              onChangeText={handlePriorityChange}
              keyboardType="numeric"
              placeholder="Enter priority"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Deadline (days)</Text>
            <TextInput
              style={styles.input}
              value={formData.deadline}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, deadline: text }))
              }
              keyboardType="numeric"
              placeholder="Enter deadline in days"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dependencies (comma-separated)</Text>
            <TextInput
              style={styles.input}
              value={formData.dependencies}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, dependencies: text }))
              }
              placeholder="Enter dependencies"
            />
            {tasks.length > 0 && (
              <Text style={styles.helpText}>
                Available tasks: {tasks.map((t) => t.task_name).join(", ")}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  helpText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTaskScreen;
