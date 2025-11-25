"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, FileText } from "lucide-react";
import { useState } from "react";

interface Page {
  id: string;
  name: string;
}

export function PagesPanel() {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", name: "Home" },
    { id: "2", name: "Sobre" },
  ]);
  const [hoveredPageId, setHoveredPageId] = useState<string | null>(null);

  const handleAddPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      name: `Página ${pages.length + 1}`,
    };
    setPages([...pages, newPage]);
  };

  const handleRemovePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  const handlePageNameChange = (id: string, newName: string) => {
    setPages(
      pages.map((page) => (page.id === id ? { ...page, name: newName } : page)),
    );
  };

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-white mb-3">Páginas</h2>
        <Button
          onClick={handleAddPage}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Página
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {pages.map((page) => (
          <div
            key={page.id}
            className="group relative mb-1 px-2"
            onMouseEnter={() => setHoveredPageId(page.id)}
            onMouseLeave={() => setHoveredPageId(null)}
          >
            <div
              className={`flex items-center gap-2 py-2 rounded cursor-pointer transition-colors ${hoveredPageId === page.id ? "bg-zinc-800" : ""}`}
            >
              <FileText className="h-4 w-4 text-zinc-400 flex-shrink-0" />
              <Input
                value={page.name}
                onChange={(e) => handlePageNameChange(page.id, e.target.value)}
                className="flex-1 bg-transparent border-0 p-0 h-auto text-sm text-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-transparent"
                onFocus={(e) => e.target.select()}
              />
              {hoveredPageId === page.id && pages.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePage(page.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
