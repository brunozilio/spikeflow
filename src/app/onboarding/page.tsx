"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ProjectPlan } from "@/lib/types/project";
import { OnboardingForm } from "./components/onboarding-form";

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [plan, setPlan] = useState<ProjectPlan>("free");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Atualiza o nome do usuário
      const userResponse = await fetch("/api/user/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!userResponse.ok) {
        throw new Error("Falha ao atualizar nome");
      }

      // Cria o primeiro projeto
      const projectResponse = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName, plan }),
      });

      if (!projectResponse.ok) {
        throw new Error("Falha ao criar projeto");
      }

      const project = await projectResponse.json();

      // Redireciona para o editor
      router.push(`/editor/${project.id}`);
    } catch (err) {
      setError("Erro ao configurar sua conta. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingForm
      name={name}
      projectName={projectName}
      plan={plan}
      onNameChange={setName}
      onProjectNameChange={setProjectName}
      onPlanChange={setPlan}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
