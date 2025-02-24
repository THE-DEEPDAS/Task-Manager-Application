import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTaskStore } from "../store/taskStore";
import { format, addDays, isAfter, isBefore } from "date-fns";
import { Task } from "../types";
import { commonStyles } from "../styles/commonStyles";

export function ScheduleScreen({ navigation }: any) {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const [scheduledTasks, setScheduledTasks] = useState<Record<string, Task[]>>(
    {}
  );

  const scheduleTask = (tasks: Task[]) => {
    const schedule: Record<string, Task[]> = {};

    // Sort tasks by priority and deadline
    const sortedTasks = [...tasks].sort((a, b) => {
      if (parseInt(a.deadline) !== parseInt(b.deadline)) {
        return parseInt(a.deadline) - parseInt(b.deadline);
      }
      return b.priority - a.priority;
    });

    // Calculate workload distribution
    sortedTasks.forEach((task) => {
      const deadline = addDays(new Date(), parseInt(task.deadline));
      const daysUntilDeadline = parseInt(task.deadline);

      // Find the best day to schedule the task
      let bestDay = format(new Date(), "yyyy-MM-dd");
      let lowestWorkload = Infinity;

      for (let i = 0; i <= daysUntilDeadline; i++) {
        const currentDay = format(addDays(new Date(), i), "yyyy-MM-dd");
        const currentWorkload = schedule[currentDay]?.length || 0;

        if (currentWorkload < lowestWorkload) {
          lowestWorkload = currentWorkload;
          bestDay = currentDay;
        }
      }

      if (!schedule[bestDay]) {
        schedule[bestDay] = [];
      }
      schedule[bestDay].push(task);
    });

    return schedule;
  };

  useEffect(() => {
    const scheduled = scheduleTask(tasks);
    setScheduledTasks(scheduled);
  }, [tasks]);

  const renderTimeSlot = (time: string, task?: Task) => (
    <View style={[styles.timeSlot, task && styles.timeSlotWithTask]}>
      <Text style={styles.timeText}>{time}</Text>
      {task && (
        <View
          style={[
            styles.taskCard,
            { backgroundColor: getPriorityColor(task.priority) },
          ]}
        >
          <Text style={styles.taskName}>{task.task_name}</Text>
          <Text style={styles.taskDetail}>Priority: {task.priority}</Text>
          <TouchableOpacity
            style={styles.statusButton}
            onPress={() => updateTaskStatus(task.task_name, "Completed")}
          >
            <Text style={styles.statusButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {Object.entries(scheduledTasks).map(([date, dayTasks]) => (
        <View key={date} style={styles.dayContainer}>
          <Text style={styles.dateHeader}>
            {format(new Date(date), "EEEE, MMMM d")}
          </Text>
          <View style={styles.timeSlotsContainer}>
            {dayTasks.map((task, index) =>
              renderTimeSlot(`${9 + index * 2}:00`, task)
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const getPriorityColor = (priority: number) => {
  if (priority >= 70) return "#FEE2E2";
  if (priority >= 40) return "#FEF3C7";
  return "#D1FAE5";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  dayContainer: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  timeSlotsContainer: {
    gap: 12,
  },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  timeSlotWithTask: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeText: {
    width: 60,
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  taskCard: {
    flex: 1,
    marginLeft: 12,
    padding: 12,
    borderRadius: 8,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  taskDetail: {
    fontSize: 14,
    color: "#4B5563",
  },
  statusButton: {
    backgroundColor: "#3B82F6",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ScheduleScreen;
