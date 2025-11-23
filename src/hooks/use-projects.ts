import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ProjectPlan } from "@/lib/types/project";

interface Project {
  id: string;
  name: string;
  plan: ProjectPlan;
  thumbnail?: string;
  updatedAt: Date;
}

export function useProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [archivedProjects, setArchivedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchArchivedProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data.map((p: any) => ({
        ...p,
        updatedAt: new Date(p.updatedAt),
      })));
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArchivedProjects = async () => {
    try {
      const response = await fetch("/api/projects/archived");
      const data = await response.json();
      setArchivedProjects(data.map((p: any) => ({
        ...p,
        updatedAt: new Date(p.updatedAt),
      })));
    } catch (error) {
      console.error("Erro ao buscar projetos arquivados:", error);
    }
  };

  const createProject = async (name: string, plan: ProjectPlan) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, plan }),
    });

    if (response.ok) {
      const newProject = await response.json();
      router.push(`/editor/${newProject.id}`);
    }
  };

  const archiveProject = async (id: string) => {
    if (!confirm("Tem certeza que deseja arquivar este projeto?")) return;

    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived: true }),
    });

    const project = projects.find(p => p.id === id);
    if (project) {
      setProjects(projects.filter(p => p.id !== id));
      setArchivedProjects([...archivedProjects, project]);
    }
  };

  const unarchiveProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived: false }),
    });

    const project = archivedProjects.find(p => p.id === id);
    if (project) {
      setArchivedProjects(archivedProjects.filter(p => p.id !== id));
      setProjects([...projects, project]);
    }
  };

  const duplicateProject = async (id: string) => {
    const response = await fetch(`/api/projects/${id}/duplicate`, { method: "POST" });
    if (response.ok) {
      fetchProjects();
    }
  };

  return {
    projects,
    archivedProjects,
    isLoading,
    createProject,
    archiveProject,
    unarchiveProject,
    duplicateProject,
  };
}
