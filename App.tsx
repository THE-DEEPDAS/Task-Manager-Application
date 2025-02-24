import React, { useEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tasks"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerLeft: () => (
            <Image
              source={require("./assets/Task Scheduler.jpg")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginRight: 10,
              }}
            />
          ),
          headerTitleAlign: "center",
          headerShadowVisible: true,
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
