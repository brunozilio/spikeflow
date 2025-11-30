"use client";

import { Type, Heading1, RectangleHorizontal, Box, Image, FormInput } from "lucide-react";
import type { ComponentType } from "@/types/page-builder";

interface ComponentTemplate {
  type: ComponentType;
  label: string;
  icon: React.ElementType;
  defaultContent?: string;
}

const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    type: "heading",
    label: "Heading",
    icon: Heading1,
    defaultContent: "Heading",
  },
  {
    type: "text",
    label: "Text",
    icon: Type,
    defaultContent: "Text content",
  },
  {
    type: "button",
    label: "Button",
    icon: RectangleHorizontal,
    defaultContent: "Click me",
  },
  {
    type: "container",
    label: "Container",
    icon: Box,
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
  },
  {
    type: "input",
    label: "Input",
    icon: FormInput,
  },
];

interface ComponentLibraryProps {
  onDragStart: (type: ComponentType, defaultContent?: string) => void;
}

export function ComponentLibrary({ onDragStart }: ComponentLibraryProps) {
  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-zinc-400 mb-4">COMPONENTS</h3>
      <div className="grid grid-cols-2 gap-2">
        {COMPONENT_TEMPLATES.map((template) => (
          <div
            key={template.type}
            draggable
            onDragStart={() => onDragStart(template.type, template.defaultContent)}
            className="flex flex-col items-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-move transition-colors border border-zinc-700 hover:border-zinc-600"
          >
            <template.icon className="w-5 h-5 text-zinc-400" />
            <span className="text-xs text-zinc-300">{template.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
