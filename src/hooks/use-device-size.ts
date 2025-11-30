import { useState, useCallback } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceSize {
  width: number;
  minHeight: number;
}

const deviceSizes: Record<DeviceType, DeviceSize> = {
  desktop: { width: 1440, minHeight: 900 },
  tablet: { width: 768, minHeight: 1024 },
  mobile: { width: 375, minHeight: 667 },
};

export function useDeviceSize() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("desktop");

  const selectDevice = useCallback((device: DeviceType) => {
    setSelectedDevice(device);
  }, []);

  const currentSize = deviceSizes[selectedDevice];

  return {
    selectedDevice,
    selectDevice,
    currentSize,
  };
}
