import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
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

  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/Task Scheduler.jpg")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Task Schedule</Text>
      </View>
      <ScrollView style={styles.scheduleContainer}>
        {sortedDates.map((date) => (
          <View key={date} style={styles.dateGroup}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateHeaderText}>
                {format(new Date(date), "EEEE, MMMM d, yyyy")}
              </Text>
            </View>
            <View style={styles.timelineContainer}>
              {groupedTasks[date]
                .sort((a, b) => b.priority - a.priority)
                .map((task) => (
                  <View key={task.id} style={styles.taskCard}>
                    <View
                      style={[
                        styles.priorityIndicator,
                        { backgroundColor: getPriorityColor(task.priority) },
                      ]}
                    />
                    <View style={styles.taskContent}>
                      <Text style={styles.taskName}>{task.task_name}</Text>
                      <View style={styles.taskDetails}>
                        <Text style={styles.taskCategory}>{task.category}</Text>
                        <Text style={styles.taskPriority}>
                          Priority: {task.priority}
                        </Text>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(task.status) },
                          ]}
                        >
                          <Text style={styles.statusText}>{task.status}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        ))}
        {sortedDates.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks scheduled</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const getPriorityColor = (priority: number) => {
  if (priority >= 70) return "#EF4444";
  if (priority >= 40) return "#F59E0B";
  return "#10B981";
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "#059669";
    case "In Progress":
      return "#2563EB";
    default:
      return "#6B7280";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  scheduleContainer: {
    flex: 1,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    backgroundColor: "#3B82F6",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  dateHeaderText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  timelineContainer: {
    paddingHorizontal: 16,
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  priorityIndicator: {
    width: 4,
  },
  taskContent: {
    flex: 1,
    padding: 16,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskCategory: {
    fontSize: 14,
    color: "#6B7280",
  },
  taskPriority: {
    fontSize: 14,
    color: "#6B7280",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },
});

export default ScheduleScreen;
