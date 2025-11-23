"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { OnboardingForm } from "./components/onboarding-form";

export default function OnboardingPage() {
  const {
    name,
    setName,
    projectName,
    setProjectName,
    plan,
    setPlan,
    isLoading,
    error,
    handleSubmit,
  } = useOnboarding();

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
