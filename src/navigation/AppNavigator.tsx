import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskListScreen } from "../screens/TaskListScreen";
import { AddTaskScreen } from "../screens/AddTaskScreen";
import { HelpScreen } from "../screens/HelpScreen";
import { DeveloperInfoScreen } from "../screens/DeveloperInfoScreen";
import { OverdueTasks } from "../components/OverdueTasks";
import { DependencyGraph } from "../components/DependencyGraph";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
