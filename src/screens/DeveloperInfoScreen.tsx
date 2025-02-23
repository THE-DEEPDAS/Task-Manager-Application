import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";

export function DeveloperInfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Developer Info</Text>
      <Text style={styles.sectionTitle}>Deep Das</Text>
      <Text style={styles.text}>
        Hi, I'm Deep Das, a passionate software developer with expertise in web
        and mobile application development.
      </Text>
      <Text style={styles.text}>
        I have a strong background in various programming languages and
        frameworks, and I enjoy creating innovative solutions to complex
        problems.
      </Text>
      <Text style={styles.sectionTitle}>Portfolio</Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://deepdas.tech")}>
        <Text style={styles.link}>https://deepdas.tech</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.text}>Email: deepdas@gmail.com</Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/deep-das-4b5aa527b/")}>
        <Text style={styles.link}>My LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("https://github.com/THE-DEEPDAS")}>
        <Text style={styles.link}>My GitHub</Text>
      </TouchableOpacity>
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
  link: {
    fontSize: 14,
    color: "#3B82F6",
    marginBottom: 4,
  },
});

export default DeveloperInfoScreen;
