import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import DeviceCard from "../components/DeviceCard";
import { Device, DeviceType } from "../types/Device";
import { makeUUID } from "../utils/uuid";
import AddDeviceModal from "../components/AddDeviceModal";

export default function DashboardScreen() {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isOn: !d.isOn } : d))
    );
  };

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const addDevice = (name: string, type: DeviceType) => {
    const newDevice: Device = {
      id: makeUUID(),
      name,
      type,
      isOn: false,
    };
    setDevices((prev) => [...prev, newDevice]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user}!</Text>

      <Button title="➕ Adicionar Dispositivo" onPress={() => setModalVisible(true)} />

      <ScrollView style={{ marginTop: 20 }}>
        {devices.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Nenhum dispositivo adicionado ainda.
          </Text>
        ) : (
          devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={toggleDevice}
              onRemove={removeDevice}
            />
          ))
        )}
      </ScrollView>

      <AddDeviceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addDevice}
      />
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
});
