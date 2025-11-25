"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  History,
  Clock,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeviceType } from "@/hooks/use-device-size";
import { useState, useRef, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  thumbnail: string | null;
  plan: "free" | "pro";
}

interface EditorToolbarProps {
  project: Project;
  onUpdateProject: (name: string) => Promise<void>;
  selectedDevice: DeviceType;
  onSelectDevice: (device: DeviceType) => void;
}

export function EditorToolbar({
  project,
  onUpdateProject,
  selectedDevice,
  onSelectDevice,
}: EditorToolbarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProjectName(project.name);
  }, [project.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (projectName.trim() && projectName !== project.name) {
      await onUpdateProject(projectName.trim());
    } else {
      setProjectName(project.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setProjectName(project.name);
      setIsEditing(false);
    }
  };
  return (
    <TooltipProvider>
      <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className="text-white font-semibold bg-zinc-800 px-2 py-1 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <h1
                  className="text-white font-semibold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  {project.name}
                </h1>
              )}
              {project.plan === "pro" ? (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-[10px] h-5">
                  <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                  Pro
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] h-5">
                  Free
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`${
              selectedDevice === "desktop"
                ? "text-primary bg-primary/10"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => onSelectDevice("desktop")}
          >
            <Monitor className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${
              selectedDevice === "tablet"
                ? "text-primary bg-primary/10"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => onSelectDevice("tablet")}
          >
            <Tablet className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${
              selectedDevice === "mobile"
                ? "text-primary bg-primary/10"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => onSelectDevice("mobile")}
          >
            <Smartphone className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white opacity-50 cursor-not-allowed"
                  disabled
                >
                  <History className="h-5 w-5" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-3 py-2">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">Em breve</span>
              </div>
            </TooltipContent>
          </Tooltip>

          <Button>Publish</Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
