import { useEffect, useCallback } from "react";
import type { CanvasElement } from "./use-canvas-selection";

export interface PageElement extends CanvasElement {
  styles: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
    background?: string;
  };
  position?: {
    x: number;
    y: number;
  };
  icon?: string | null;
  iconPosition?: "left" | "right";
  iconSize?: number;
}

export interface PageState {
  projectId: string;
  elements: Record<string, PageElement>;
  canvasSettings: {
    width: number;
    height: number;
    zoom: number;
    offset: {
      x: number;
      y: number;
    };
  };
  version: string;
  lastModified: string;
}

export function usePageState(projectId: string) {
  const STORAGE_KEY = `spikeflow_page_${projectId}`;

  const savePageState = useCallback(
    (state: Partial<PageState>) => {
      const currentState = loadPageState();
      const newState: PageState = {
        ...currentState,
        ...state,
        projectId,
        version: "1.0.0",
        lastModified: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      console.log("Page state saved:", newState);
    },
    [projectId, STORAGE_KEY],
  );

  const loadPageState = useCallback((): PageState => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading page state:", error);
    }

    return {
      projectId,
      elements: {},
      canvasSettings: {
        width: 1440,
        height: 900,
        zoom: 1,
        offset: { x: 0, y: 0 },
      },
      version: "1.0.0",
      lastModified: new Date().toISOString(),
    };
  }, [projectId, STORAGE_KEY]);

  const captureElementState = useCallback(
    (
      elementId: string,
      currentType?: string,
      currentElement?: CanvasElement,
    ): PageElement | null => {
      const element = document.getElementById(elementId);
      if (!element) return null;

      const styles = window.getComputedStyle(element);

      // Usa o tipo atual se fornecido, senão tenta pegar do data-type ou usa tagName
      const elementType =
        currentType ||
        element.getAttribute("data-element-type") ||
        element.tagName.toLowerCase();

      return {
        id: elementId,
        type: elementType as any,
        content: element.innerText || "",
        styles: {
          color: element.style.color || styles.color,
          backgroundColor:
            element.style.backgroundColor || styles.backgroundColor,
          background: element.style.background || styles.background,
          fontSize: element.style.fontSize || styles.fontSize,
          fontWeight: element.style.fontWeight || styles.fontWeight,
          fontFamily: element.style.fontFamily || styles.fontFamily,
          textAlign: element.style.textAlign || styles.textAlign,
        },
        icon: currentElement?.icon,
        iconPosition: currentElement?.iconPosition,
        iconSize: currentElement?.iconSize,
      };
    },
    [],
  );

  const captureAllElements = useCallback(
    (
      elementIds: string[],
      currentElements?: Record<string, CanvasElement>,
    ): Record<string, PageElement> => {
      const elements: Record<string, PageElement> = {};

      elementIds.forEach((id) => {
        // Passa o tipo atual do elemento se disponível
        const currentType = currentElements?.[id]?.type;
        const currentElement = currentElements?.[id];
        const elementState = captureElementState(
          id,
          currentType,
          currentElement,
        );
        if (elementState) {
          elements[id] = elementState;
        }
      });

      return elements;
    },
    [captureElementState],
  );

  const saveCurrentState = useCallback(
    (
      elementIds: string[],
      canvasSettings?: PageState["canvasSettings"],
      currentElements?: Record<string, CanvasElement>,
    ) => {
      const elements = captureAllElements(elementIds, currentElements);

      savePageState({
        elements,
        canvasSettings,
      });
    },
    [captureAllElements, savePageState],
  );

  return {
    savePageState,
    loadPageState,
    captureElementState,
    captureAllElements,
    saveCurrentState,
  };
}
