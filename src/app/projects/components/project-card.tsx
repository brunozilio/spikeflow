import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  ExternalLink,
  Copy,
  Archive,
  ArchiveRestore,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelativeDate } from "@/lib/format-date";
import type { ProjectPlan } from "@/lib/types/project";

interface ProjectCardProps {
  id: string;
  name: string;
  plan: ProjectPlan;
  thumbnail?: string;
  updatedAt: Date;
  isArchived?: boolean;
  onArchive?: () => void;
  onUnarchive?: () => void;
  onDuplicate?: () => void;
}

export function ProjectCard({
  id,
  name,
  plan,
  thumbnail,
  updatedAt,
  isArchived = false,
  onArchive,
  onUnarchive,
  onDuplicate,
}: ProjectCardProps) {
  return (
    <div className="group relative rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/editor/${id}`} className="block">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10">
              <span className="text-4xl font-bold text-yellow-600/20">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

          <div className="absolute top-2 left-2">
            {plan === "pro" ? (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            ) : (
              <Badge variant="secondary">Free</Badge>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/editor/${id}`}>
              <h3 className="font-semibold truncate hover:text-primary transition-colors">
                {name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {formatRelativeDate(updatedAt)}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/editor/${id}`}
                  className="flex items-center cursor-pointer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir
                </Link>
              </DropdownMenuItem>
              {onDuplicate && (
                <DropdownMenuItem
                  onClick={onDuplicate}
                  className="cursor-pointer"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {isArchived
                ? onUnarchive && (
                    <DropdownMenuItem
                      onClick={onUnarchive}
                      className="text-blue-600 cursor-pointer"
                    >
                      <ArchiveRestore className="mr-2 h-4 w-4" />
                      Desarquivar
                    </DropdownMenuItem>
                  )
                : onArchive && (
                    <DropdownMenuItem
                      onClick={onArchive}
                      className="text-orange-600 cursor-pointer"
                    >
                      <Archive className="mr-2 h-4 w-4" />
                      Arquivar
                    </DropdownMenuItem>
                  )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
