import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export function Header({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/Task Scheduler.jpg")}
        style={styles.logo}
      />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
});
