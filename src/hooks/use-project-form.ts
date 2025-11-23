import { useState } from "react";
import type { ProjectPlan } from "@/lib/types/project";

export function useProjectForm(
  onSubmit: (name: string, plan: ProjectPlan) => Promise<void>
) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<ProjectPlan>("free");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(name.trim(), plan);
      setName("");
      setPlan("free");
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    name,
    setName,
    plan,
    setPlan,
    isLoading,
    handleSubmit,
  };
}
