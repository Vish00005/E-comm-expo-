import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

// Define the type of your API response
type User = {
  name: string;
  age: number;
};

export default function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Note: Android Emulators do not use localhost for the host machine.
    // If testing on a physical device, you need to use your computer's local Wi-Fi IP address instead.
    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:3000/hello1234"
        : "http://localhost:3000/hello1234";

    fetch(backendUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch((err: Error) => {
        console.log("Fetch error:", err);
        setError(err.message || "Failed to fetch data");
      });
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : user ? (
        <View style={styles.card}>
          <Text style={styles.title}>Data from Server:</Text>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Age: {user.age}</Text>
          <TouchableOpacity onPress={() => alert("Pressed button")}>
            <Text>Button</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>Loading data...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    padding: 20,
    textAlign: "center",
  },
});
