import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function NoInternet({ onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📡</Text>

      <Text style={styles.title}>No Internet Connection</Text>

      <Text style={styles.subtitle}>
        Please check your WiFi or mobile data and try again.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});