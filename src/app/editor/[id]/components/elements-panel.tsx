"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Box,
  Type,
  Link as LinkIcon,
  Square,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const elements = [
  { name: "Frame", icon: Square, type: "div" },
  { name: "Text", icon: Type, type: "text" },
  { name: "Link", icon: LinkIcon, type: "link" },
  { name: "Button", icon: Box, type: "button" },
];

export function ElementsPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredElements = elements.filter((element) =>
    element.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar elementos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="mb-3">
          <h3 className="text-white font-medium text-sm">Elementos</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {filteredElements.map((element) => (
            <ElementCard key={element.name} {...element} />
          ))}
        </div>

        {filteredElements.length === 0 && (
          <div className="text-center py-8 text-zinc-500 text-sm">
            Nenhum elemento encontrado
          </div>
        )}
      </div>
    </div>
  );
}

function ElementCard({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ElementType;
  type: string;
}) {
  return (
    <button className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-xs font-medium">{name}</span>
    </button>
  );
}
