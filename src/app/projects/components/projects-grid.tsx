import { ProjectCard } from "./project-card";
import type { ProjectPlan } from "@/lib/types/project";

interface Project {
  id: string;
  name: string;
  plan: ProjectPlan;
  thumbnail?: string;
  updatedAt: Date;
  isArchived?: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
  isArchived?: boolean;
  onArchiveProject?: (id: string) => void;
  onUnarchiveProject?: (id: string) => void;
  onDuplicateProject?: (id: string) => void;
}

export function ProjectsGrid({
  projects,
  isArchived = false,
  onArchiveProject,
  onUnarchiveProject,
  onDuplicateProject,
}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          plan={project.plan}
          thumbnail={project.thumbnail}
          updatedAt={project.updatedAt}
          isArchived={isArchived}
          onArchive={
            onArchiveProject ? () => onArchiveProject(project.id) : undefined
          }
          onUnarchive={
            onUnarchiveProject
              ? () => onUnarchiveProject(project.id)
              : undefined
          }
          onDuplicate={
            onDuplicateProject
              ? () => onDuplicateProject(project.id)
              : undefined
          }
        />
      ))}
    </div>
  );
}
