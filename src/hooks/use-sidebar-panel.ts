import { useState, useCallback } from "react";

export type PanelType =
  | "add"
  | "pages"
  | "database"
  | "storage"
  | "settings"
  | null;

export function useSidebarPanel() {
  const [activePanel, setActivePanel] = useState<PanelType>("add");

  const togglePanel = useCallback((panel: PanelType) => {
    setActivePanel((current) => (current === panel ? null : panel));
  }, []);

  return {
    activePanel,
    togglePanel,
  };
}
