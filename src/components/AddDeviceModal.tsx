// src/components/AddDeviceModal.tsx
import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DeviceType } from "../types/Device";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, type: DeviceType) => void;
};

export default function AddDeviceModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<DeviceType>("lamp");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name, type);
    setName("");
    setType("lamp");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Novo Dispositivo</Text>

          <TextInput
            placeholder="Nome do dispositivo"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Picker selectedValue={type} onValueChange={(val) => setType(val as DeviceType)} style={{ marginBottom: 15}}>
            <Picker.Item label="Lâmpada" value="lamp" />
            <Picker.Item label="Ar Condicionado" value="ac" />
            <Picker.Item label="TV" value="tv" />
            <Picker.Item label="Tomada" value="plug" />
            <Picker.Item label="Ventilador" value="fan" />
            <Picker.Item label="Câmera" value="camera" />
          </Picker>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Adicionar" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
