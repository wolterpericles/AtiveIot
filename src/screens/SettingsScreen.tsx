import React, { useState } from "react";
import { View, Text, Switch, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Usuário logado:</Text>
        <Text style={styles.value}>{user}</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Tema escuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.logout}>
        <Button title="Sair da conta" color="red" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  logout: {
    marginTop: 40,
  },
});
