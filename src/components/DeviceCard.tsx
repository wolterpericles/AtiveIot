import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Device } from "../types/Device";

type Props = {
  device: Device;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function DeviceCard({ device, onToggle, onRemove }: Props) {
  const { id, name, type, isOn } = device;

  // Escolhe ícone por tipo
  const getIcon = () => {
    switch (type) {
      case "lamp":
        return isOn ? "bulb" : "bulb-outline";
      case "ac":
        return isOn ? "snow" : "snow-outline";
      case "tv":
        return isOn ? "tv" : "tv-outline";
      case "plug":
        return isOn ? "flash" : "flash-outline";
      case "fan":
        return isOn ? "reload" : "reload-outline"; // ventilador fake
      case "camera":
        return isOn ? "videocam" : "videocam-outline";
      default:
        return "help";
    }
  };

  // Infos extras quando ligado
  const getExtraInfo = () => {
    if (!isOn) return null;
    switch (type) {
      case "lamp":
        return "Consumo: 12W";
      case "ac":
        return "Temperatura: 22°C";
      case "tv":
        return "Canal: 5 (HBO)";
      case "plug":
        return "Consumo: 150W";
      case "fan":
        return "Velocidade: 3";
      case "camera":
        return "Streaming ativo";
      default:
        return "";
    }
  };

  return (
    <View style={styles.card}>
      <Ionicons name={getIcon()} size={40} color={isOn ? "gold" : "gray"} />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{isOn ? "Ligado" : "Desligado"}</Text>
        {isOn && <Text style={styles.extra}>{getExtraInfo()}</Text>}
      </View>
      <Switch value={isOn} onValueChange={() => onToggle(id)} />
      <Button title="X" color="red" onPress={() => onRemove(id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "gray",
  },
  extra: {
    fontSize: 13,
    color: "green",
  },
});
