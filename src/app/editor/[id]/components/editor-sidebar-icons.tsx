"use client";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Database,
  Folder,
  Settings,
  Clock,
  FileText,
} from "lucide-react";
import { PanelType } from "@/hooks/use-sidebar-panel";

interface SidebarIconProps {
  icon: React.ElementType;
  label: string;
  panelType: PanelType;
  comingSoon?: boolean;
}

interface EditorSidebarIconsProps {
  activePanel: PanelType;
  onTogglePanel: (panel: PanelType) => void;
}

const sidebarIcons: SidebarIconProps[] = [
  { icon: Plus, label: "Adicionar", panelType: "add" },
  { icon: FileText, label: "Páginas", panelType: "pages" },
  {
    icon: Database,
    label: "Banco de Dados",
    panelType: "database",
    comingSoon: true,
  },
  { icon: Folder, label: "Storage", panelType: "storage", comingSoon: true },
  {
    icon: Settings,
    label: "Configurações",
    panelType: "settings",
    comingSoon: true,
  },
];

export function EditorSidebarIcons({
  activePanel,
  onTogglePanel,
}: EditorSidebarIconsProps) {
  return (
    <TooltipProvider>
      <div className="w-16 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 gap-2">
        <div className="mb-4">
          <LogoIcon />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          {sidebarIcons.map((item) => (
            <NavButton
              key={item.label}
              {...item}
              active={activePanel === item.panelType}
              onTogglePanel={onTogglePanel}
            />
          ))}
        </div>

        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function NavButton({
  icon: Icon,
  label,
  panelType,
  active = false,
  comingSoon = false,
  onTogglePanel,
}: SidebarIconProps & {
  active?: boolean;
  onTogglePanel: (panel: PanelType) => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block">
          <Button
            variant="ghost"
            size="icon"
            className={`w-10 h-10 ${
              active
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            } ${comingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={comingSoon}
            onClick={() => !comingSoon && onTogglePanel(panelType)}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent side="right" className="px-3 py-2">
        {comingSoon ? (
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium">Em breve</span>
          </div>
        ) : (
          <p className="text-xs font-medium">{label}</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
