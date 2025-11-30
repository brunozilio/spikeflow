"use client";

import { EditorToolbar } from "./components/editor-toolbar";
import { EditorSidebarIcons } from "./components/editor-sidebar-icons";
import { ElementsPanel } from "./components/elements-panel";
import { PagesPanel } from "./components/pages-panel";
import { CanvasArea } from "./components/canvas-area";
import { PropertiesPanel } from "./components/properties-panel";
import { useSidebarPanel } from "@/hooks/use-sidebar-panel";
import { useDeviceSize } from "@/hooks/use-device-size";
import { useCanvasSelection } from "@/hooks/use-canvas-selection";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

interface Project {
  id: string;
  name: string;
  thumbnail: string | null;
  plan: "free" | "pro";
  isArchived: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditorPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const { activePanel, togglePanel } = useSidebarPanel();
  const { selectedDevice, selectDevice, currentSize } = useDeviceSize();
  const canvasSelection = useCanvasSelection();
  const updateElementCallbackRef = useRef<
    ((elementId: string, updates: any) => void) | null
  >(null);

  useEffect(() => {
    console.log("Fetching project:", projectId);
    fetch(`/api/projects/${projectId}`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Project data:", data);
        setProject(data);
      })
      .catch((err) => console.error("Error fetching project:", err));
  }, [projectId]);

  const updateProject = async (name: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const updated = await res.json();
      setProject(updated);
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950 text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      <EditorToolbar
        project={project}
        onUpdateProject={updateProject}
        selectedDevice={selectedDevice}
        onSelectDevice={selectDevice}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSidebarIcons
          activePanel={activePanel}
          onTogglePanel={togglePanel}
        />

        {/* Painel de Adicionar Elementos */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activePanel === "add"
              ? "w-80 opacity-100"
              : "w-0 opacity-0 overflow-hidden"
          }`}
        >
          <ElementsPanel />
        </div>

        {/* Painel de Páginas */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activePanel === "pages"
              ? "w-64 opacity-100"
              : "w-0 opacity-0 overflow-hidden"
          }`}
        >
          <PagesPanel />
        </div>

        <CanvasArea
          currentSize={currentSize}
          canvasSelection={canvasSelection}
          projectId={projectId}
          onRegisterUpdateCallback={(callback) => {
            updateElementCallbackRef.current = callback;
          }}
        />
        <PropertiesPanel
          selectedElement={canvasSelection.selectedElement}
          onUpdateElement={(updates) => {
            console.log(
              "PropertiesPanel onUpdateElement called with:",
              updates,
            );
            console.log("selectedElement:", canvasSelection.selectedElement);
            console.log(
              "updateElementCallback exists:",
              !!updateElementCallbackRef.current,
            );
            if (
              canvasSelection.selectedElement &&
              updateElementCallbackRef.current
            ) {
              updateElementCallbackRef.current(
                canvasSelection.selectedElement.id,
                updates,
              );
            }
            canvasSelection.updateElement(updates);
          }}
        />
      </div>
    </div>
  );
}
