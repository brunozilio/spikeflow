"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/use-projects";
import Header from "./components/header";
import { NoProjects } from "./components/no-projects";
import { ProjectsGrid } from "./components/projects-grid";
import { NewProjectDialog } from "./components/new-project-dialog";

export default function ProjectsPage() {
  const {
    projects,
    archivedProjects,
    isLoading,
    createProject,
    archiveProject,
    unarchiveProject,
    duplicateProject,
  } = useProjects();

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
              <NewProjectDialog onCreateProject={createProject} />
            </div>

            <TabsContent value="active">
              {projects.length === 0 ? (
                <NoProjects onCreateProject={createProject} />
              ) : (
                <ProjectsGrid
                  projects={projects}
                  onArchiveProject={archiveProject}
                  onDuplicateProject={duplicateProject}
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
                  onUnarchiveProject={unarchiveProject}
                  onDuplicateProject={duplicateProject}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
