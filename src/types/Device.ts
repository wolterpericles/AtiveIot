// src/types/Device.ts
export type DeviceType = "lamp" | "ac" | "tv" | "plug" | "fan" | "camera";

export type Device = {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
};

