import { FolderCode } from "lucide-react";
import type { ProjectPlan } from "@/lib/types/project";
import { NewProjectDialog } from "./new-project-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface NoProjectsProps {
  onCreateProject: (name: string, plan: ProjectPlan) => Promise<void>;
}

export function NoProjects({ onCreateProject }: NoProjectsProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCode />
        </EmptyMedia>
        <EmptyTitle>Nenhum Projeto Ainda</EmptyTitle>
        <EmptyDescription>
          Você ainda não criou nenhum projeto. Comece criando seu primeiro
          projeto.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <NewProjectDialog onCreateProject={onCreateProject} />
      </EmptyContent>
    </Empty>
  );
}
