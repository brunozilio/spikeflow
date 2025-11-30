"use client";

import { useCanvasPan } from "@/hooks/use-canvas-pan";
import {
  useCanvasSelection,
  type CanvasElement,
} from "@/hooks/use-canvas-selection";
import { usePageState } from "@/hooks/use-page-state";
import { EditableText } from "./editable-text";
import { useEffect, useState, useRef } from "react";

interface CanvasAreaProps {
  currentSize: {
    width: number;
    minHeight: number;
  };
  canvasSelection: ReturnType<typeof useCanvasSelection>;
  projectId: string;
  onRegisterUpdateCallback?: (
    callback: (elementId: string, updates: Partial<CanvasElement>) => void,
  ) => void;
}

export function CanvasArea({
  currentSize,
  canvasSelection,
  projectId,
  onRegisterUpdateCallback,
}: CanvasAreaProps) {
  const {
    offset,
    zoom,
    isDragging,
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleWheel,
    resetPosition,
    fitToView,
  } = useCanvasPan();

  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isCommandPressed, setIsCommandPressed] = useState(false);
  const isEditingRef = useRef(false);

  // Hook para gerenciar estado da página
  const { saveCurrentState, loadPageState } = usePageState(projectId);

  // Detecta se está editando baseado no canvasSelection
  const isEditingText = canvasSelection.isEditing;

  // Atualiza o ref quando isEditing muda
  useEffect(() => {
    isEditingRef.current = isEditingText;
  }, [isEditingText]);

  // Elementos iniciais default
  const DEFAULT_ELEMENTS: Record<string, CanvasElement> = {
    "hero-container": {
      id: "hero-container",
      type: "div",
      content: "",
    },
    "heading-main": {
      id: "heading-main",
      type: "heading",
      content: "Maximizing the Potential of your Employees",
    },
    "text-description": {
      id: "text-description",
      type: "text",
      content:
        "Hrmanage is a people management solution that helps employers onboarding, performance tracking, payroll, and attendance management.",
    },
    "button-get-started": {
      id: "button-get-started",
      type: "button",
      content: "Get Started",
    },
    "button-meet-expert": {
      id: "button-meet-expert",
      type: "button",
      content: "Meet an Expert",
    },
  };

  // State para elementos (será carregado do localStorage ou usará default)
  const [elements, setElements] =
    useState<Record<string, CanvasElement>>(DEFAULT_ELEMENTS);

  // Função para atualizar um elemento
  const handleUpdateElement = (
    elementId: string,
    updates: Partial<CanvasElement>,
  ) => {
    console.log(
      "handleUpdateElement - elementId:",
      elementId,
      "updates:",
      updates,
    );
    setElements((prev) => {
      const updated = {
        ...prev,
        [elementId]: {
          ...prev[elementId],
          ...updates,
        },
      };
      console.log("handleUpdateElement - updated elements:", updated);
      return updated;
    });
    // Também atualiza no canvasSelection
    canvasSelection.updateElement(updates);
  };

  // Registra o callback de atualização para o PropertiesPanel
  useEffect(() => {
    if (onRegisterUpdateCallback) {
      onRegisterUpdateCallback(handleUpdateElement);
    }
  }, [onRegisterUpdateCallback]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitToView(currentSize.width, currentSize.minHeight);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentSize, fitToView]);

  // Carrega o estado salvo ao montar o componente (apenas uma vez)
  useEffect(() => {
    const savedState = loadPageState();

    if (savedState.elements && Object.keys(savedState.elements).length > 0) {
      // Atualiza o state com os elementos salvos (conteúdo + estilos)
      const restoredElements: Record<string, CanvasElement> = {};

      Object.entries(savedState.elements).forEach(([id, elementData]) => {
        restoredElements[id] = {
          id: elementData.id,
          type: elementData.type as any,
          content: elementData.content || DEFAULT_ELEMENTS[id]?.content || "",
          styles: elementData.styles || {},
          icon: elementData.icon,
          iconPosition: elementData.iconPosition,
          iconSize: elementData.iconSize,
        };
      });

      setElements(restoredElements);

      // Aplica os estilos no DOM após um delay
      setTimeout(() => {
        Object.entries(savedState.elements).forEach(([id, elementData]) => {
          const element = document.getElementById(id);
          if (element && elementData.styles) {
            if (elementData.styles.color)
              element.style.color = elementData.styles.color;
            if (elementData.styles.background)
              element.style.background = elementData.styles.background;
            if (elementData.styles.backgroundColor)
              element.style.backgroundColor =
                elementData.styles.backgroundColor;
            if (elementData.styles.fontSize)
              element.style.fontSize = elementData.styles.fontSize;
            if (elementData.styles.fontWeight)
              element.style.fontWeight = elementData.styles.fontWeight;
            if (elementData.styles.fontFamily)
              element.style.fontFamily = elementData.styles.fontFamily;
            if (elementData.styles.textAlign)
              element.style.textAlign = elementData.styles.textAlign;
          }
        });
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salva o estado automaticamente a cada 2 segundos
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const elementIds = Object.keys(elements);
      saveCurrentState(
        elementIds,
        {
          width: currentSize.width,
          height: currentSize.minHeight,
          zoom,
          offset,
        },
        elements,
      );
    }, 2000);

    return () => clearInterval(saveInterval);
  }, [elements, currentSize, zoom, offset, saveCurrentState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Não intercepta teclas quando está editando
      if (isEditingRef.current) return;

      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setIsSpacePressed(true);
      }
      if ((e.metaKey || e.ctrlKey) && !e.repeat) {
        setIsCommandPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Não intercepta teclas quando está editando
      if (isEditingRef.current) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsSpacePressed(false);
      }
      if (!e.metaKey && !e.ctrlKey) {
        setIsCommandPressed(false);
      }
    };

    const preventNavigation = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", preventNavigation, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("wheel", preventNavigation);
    };
  }, [isEditingText]);

  const canPan = isSpacePressed || isCommandPressed;

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-zinc-950 overflow-hidden relative"
      style={{
        cursor: isDragging ? "grabbing" : canPan ? "grab" : "default",
      }}
      onMouseDown={(e) => {
        if (canPan) {
          handleMouseDown(e);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div
        className="absolute p-8 left-1/2"
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px) scale(${zoom})`,
          transformOrigin: "top center",
          transition: isDragging ? "none" : "transform 0.1s",
        }}
      >
        <div
          className="mx-auto bg-white shadow-2xl transition-all duration-300"
          style={{ width: currentSize.width, minHeight: currentSize.minHeight }}
        >
          <div className="relative">
            <div
              id="hero-container"
              className={`p-16 cursor-pointer transition-all ${
                canvasSelection.selectedElement?.id === "hero-container"
                  ? "outline outline-2 outline-primary outline-offset-2"
                  : ""
              }`}
              style={{
                background:
                  "linear-gradient(to bottom right, rgb(30 27 75), rgb(59 7 100))",
              }}
              onClick={(e) => {
                e.stopPropagation();
                canvasSelection.selectElement(elements["hero-container"]);
              }}
            >
              <div className="mb-8">
                <EditableText
                  element={elements["heading-main"]}
                  isSelected={
                    canvasSelection.selectedElement?.id === "heading-main"
                  }
                  isEditing={
                    canvasSelection.isEditing &&
                    canvasSelection.selectedElement?.id === "heading-main"
                  }
                  onSelect={() =>
                    canvasSelection.selectElement(elements["heading-main"])
                  }
                  onDoubleClick={() => canvasSelection.startEditing()}
                  onUpdate={(content) =>
                    handleUpdateElement("heading-main", { content })
                  }
                  onStopEditing={() => canvasSelection.stopEditing()}
                  className="text-5xl font-bold text-white mb-4"
                  as="h1"
                />
                <EditableText
                  element={elements["text-description"]}
                  isSelected={
                    canvasSelection.selectedElement?.id === "text-description"
                  }
                  isEditing={
                    canvasSelection.isEditing &&
                    canvasSelection.selectedElement?.id === "text-description"
                  }
                  onSelect={() =>
                    canvasSelection.selectElement(elements["text-description"])
                  }
                  onDoubleClick={() => canvasSelection.startEditing()}
                  onUpdate={(content) =>
                    handleUpdateElement("text-description", { content })
                  }
                  onStopEditing={() => canvasSelection.stopEditing()}
                  className="text-zinc-300 text-sm"
                  as="p"
                />
              </div>

              <div className="flex gap-3 justify-center mb-12">
                <EditableText
                  element={elements["button-get-started"]}
                  isSelected={
                    canvasSelection.selectedElement?.id === "button-get-started"
                  }
                  isEditing={
                    canvasSelection.isEditing &&
                    canvasSelection.selectedElement?.id === "button-get-started"
                  }
                  onSelect={() =>
                    canvasSelection.selectElement(
                      elements["button-get-started"],
                    )
                  }
                  onDoubleClick={() => canvasSelection.startEditing()}
                  onUpdate={(content) =>
                    handleUpdateElement("button-get-started", { content })
                  }
                  onStopEditing={() => canvasSelection.stopEditing()}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                  as="button"
                />
                <EditableText
                  element={elements["button-meet-expert"]}
                  isSelected={
                    canvasSelection.selectedElement?.id === "button-meet-expert"
                  }
                  isEditing={
                    canvasSelection.isEditing &&
                    canvasSelection.selectedElement?.id === "button-meet-expert"
                  }
                  onSelect={() =>
                    canvasSelection.selectElement(
                      elements["button-meet-expert"],
                    )
                  }
                  onDoubleClick={() => canvasSelection.startEditing()}
                  onUpdate={(content) =>
                    handleUpdateElement("button-meet-expert", { content })
                  }
                  onStopEditing={() => canvasSelection.stopEditing()}
                  className="px-6 py-3 bg-white text-black rounded-lg font-medium"
                  as="button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
