"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectPlan } from "@/lib/types/project";
import Header from "./components/header";
import { NoProjects } from "./components/no-projects";
import { ProjectsGrid } from "./components/projects-grid";
import { NewProjectDialog } from "./components/new-project-dialog";

interface Project {
  id: string;
  name: string;
  plan: ProjectPlan;
  thumbnail?: string;
  updatedAt: Date;
}

export default function ProjectsPage() {
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
      setProjects(
        data.map((p: any) => ({
          ...p,
          updatedAt: new Date(p.updatedAt),
        })),
      );
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
      setArchivedProjects(
        data.map((p: any) => ({
          ...p,
          updatedAt: new Date(p.updatedAt),
        })),
      );
    } catch (error) {
      console.error("Erro ao buscar projetos arquivados:", error);
    }
  };

  const handleCreateProject = async (name: string, plan: ProjectPlan) => {
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

  const handleArchiveProject = async (id: string) => {
    if (!confirm("Tem certeza que deseja arquivar este projeto?")) return;

    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived: true }),
    });

    const project = projects.find((p) => p.id === id);
    if (project) {
      setProjects(projects.filter((p) => p.id !== id));
      setArchivedProjects([...archivedProjects, project]);
    }
  };

  const handleUnarchiveProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived: false }),
    });

    const project = archivedProjects.find((p) => p.id === id);
    if (project) {
      setArchivedProjects(archivedProjects.filter((p) => p.id !== id));
      setProjects([...projects, project]);
    }
  };

  const handleDuplicateProject = async (id: string) => {
    const response = await fetch(`/api/projects/${id}/duplicate`, {
      method: "POST",
    });
    if (response.ok) {
      fetchProjects();
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <Tabs defaultValue="active" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="active">
                  Ativos ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="archived">
                  Arquivados ({archivedProjects.length})
                </TabsTrigger>
              </TabsList>
              <NewProjectDialog onCreateProject={handleCreateProject} />
            </div>

            <TabsContent value="active">
              {projects.length === 0 ? (
                <NoProjects onCreateProject={handleCreateProject} />
              ) : (
                <ProjectsGrid
                  projects={projects}
                  onArchiveProject={handleArchiveProject}
                  onDuplicateProject={handleDuplicateProject}
                />
              )}
            </TabsContent>

            <TabsContent value="archived">
              {archivedProjects.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhum projeto arquivado
                </div>
              ) : (
                <ProjectsGrid
                  projects={archivedProjects}
                  isArchived
                  onUnarchiveProject={handleUnarchiveProject}
                  onDuplicateProject={handleDuplicateProject}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
