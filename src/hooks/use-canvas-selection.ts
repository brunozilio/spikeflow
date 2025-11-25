import { useState, useCallback } from "react";

export interface CanvasElement {
  id: string;
  type: "text" | "heading" | "button" | "link" | "div";
  content: string;
  styles?: Record<string, string>;
  icon?: string | null;
  iconPosition?: "left" | "right";
  iconSize?: number;
}

export function useCanvasSelection() {
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  const selectElement = useCallback((element: CanvasElement) => {
    setSelectedElement(element);
    setIsEditing(false);
  }, []);

  const deselectElement = useCallback(() => {
    setSelectedElement(null);
    setIsEditing(false);
  }, []);

  const startEditing = useCallback(() => {
    if (selectedElement) {
      setIsEditing(true);
    }
  }, [selectedElement]);

  const updateElement = useCallback(
    (updates: Partial<CanvasElement>) => {
      if (selectedElement) {
        setSelectedElement({ ...selectedElement, ...updates });
      }
    },
    [selectedElement],
  );

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  return {
    selectedElement,
    isEditing,
    selectElement,
    deselectElement,
    startEditing,
    stopEditing,
    updateElement,
  };
}
