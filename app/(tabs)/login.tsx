import { styles } from "@/constants/StyleSheet";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  onLoginSuccess: () => void;
};

// 🔐 user + password ที่อนุญาต
const USERS: Record<string, string> = {
  A1: "1234",
  A2: "5678",
  A3: "9012",
};

export default function LoginScreen({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogin = () => {
    const normalizedUsername = username.trim().toUpperCase();
    const expectedPassword = USERS[normalizedUsername];

    if (!expectedPassword) {
      setError("User not allowed");
      return;
    }

    if (password !== expectedPassword) {
      setError("Invalid password");
      return;
    }

    setError("");
    onLoginSuccess();
  };

  return (
    <View style={styles.container2}>
      <View style={styles.loginCard}>
        <Text style={styles.title1}>Login</Text>

        <TextInput
          placeholder="Username"
          autoCapitalize="characters"
          style={styles.input1}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError("");
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input1}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Buttons */}
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button1, { flex: 1 }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText1}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
