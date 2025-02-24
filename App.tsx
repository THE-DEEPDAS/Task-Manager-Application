import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connectDB } from "./src/db/mongodb";
import { useTaskStore } from "./src/store/taskStore";
import { TaskListScreen } from "./src/screens/TaskListScreen";
import { AddTaskScreen } from "./src/screens/AddTaskScreen";
import { HelpScreen } from "./src/screens/HelpScreen";
import { DeveloperInfoScreen } from "./src/screens/DeveloperInfoScreen";
import { OverdueTasks } from "./src/components/OverdueTasks";
import { DependencyGraph } from "./src/components/DependencyGraph";
import { ScheduleScreen } from "./src/screens/ScheduleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    connectDB();
    fetchTasks();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tasks"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3B82F6",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen
          name="Tasks"
          component={TaskListScreen}
          options={{
            title: "Task Manager",
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            title: "Add New Task",
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{
            title: "Help",
          }}
        />
        <Stack.Screen
          name="DeveloperInfo"
          component={DeveloperInfoScreen}
          options={{
            title: "Developer Info",
          }}
        />
        <Stack.Screen
          name="OverdueTasks"
          component={OverdueTasks}
          options={{
            title: "Overdue Tasks",
          }}
        />
        <Stack.Screen
          name="DependencyGraph"
          component={DependencyGraph}
          options={{
            title: "Dependency Graph",
          }}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{
            title: "Schedule",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
