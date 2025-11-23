import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProjectPlan } from "@/lib/types/project";
import { Sparkles } from "lucide-react";

interface OnboardingFormProps {
  name: string;
  projectName: string;
  plan: ProjectPlan;
  onNameChange: (name: string) => void;
  onProjectNameChange: (projectName: string) => void;
  onPlanChange: (plan: ProjectPlan) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
}

export function OnboardingForm({
  name,
  projectName,
  plan,
  onNameChange,
  onProjectNameChange,
  onPlanChange,
  onSubmit,
  isLoading,
  error,
}: OnboardingFormProps) {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form onSubmit={onSubmit} className="max-w-md m-auto h-fit w-full">
        <div className="p-6">
          <div className="mb-8 text-center">
            <Logo className="mx-auto mb-4" />
            <h1 className="mb-2 text-2xl font-semibold">
              Bem-vindo ao Spikeflow!
            </h1>
            <p className="text-muted-foreground">
              Vamos começar configurando sua conta e criando seu primeiro
              projeto
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-sm">
                Seu nome
              </Label>
              <Input
                type="text"
                required
                name="name"
                id="name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="João Silva"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-name" className="block text-sm">
                Nome do seu primeiro projeto
              </Label>
              <Input
                type="text"
                required
                name="project-name"
                id="project-name"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                placeholder="Meu Primeiro Projeto"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-3">
              <Label>Plano do projeto</Label>
              <RadioGroup
                value={plan}
                onValueChange={(value) => onPlanChange(value as ProjectPlan)}
              >
                <div className="flex items-start space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors">
                  <RadioGroupItem value="free" id="free" className="mt-0.5" />
                  <div className="flex-1">
                    <Label
                      htmlFor="free"
                      className="cursor-pointer font-medium"
                    >
                      Free
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Ideal para testar e projetos pessoais
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                  <RadioGroupItem value="pro" id="pro" className="mt-0.5" />
                  <div className="flex-1">
                    <Label
                      htmlFor="pro"
                      className="cursor-pointer font-medium flex items-center gap-1"
                    >
                      Pro
                      <Sparkles className="h-3 w-3 text-yellow-600" />
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recursos avançados e sem limitações
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !name.trim() || !projectName.trim()}
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Criando...
                </>
              ) : (
                "Criar e Começar"
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
