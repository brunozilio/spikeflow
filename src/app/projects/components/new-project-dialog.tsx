"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProjectPlan } from "@/lib/types/project";
import { Plus, Sparkles } from "lucide-react";
import { useState } from "react";

interface NewProjectDialogProps {
  onCreateProject: (name: string, plan: ProjectPlan) => Promise<void>;
}

export function NewProjectDialog({ onCreateProject }: NewProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<ProjectPlan>("free");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await onCreateProject(name.trim(), plan);
      setName("");
      setPlan("free");
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Novo Projeto</DialogTitle>
            <DialogDescription>
              Escolha um nome e o plano para seu novo projeto.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nome do Projeto</Label>
              <Input
                id="project-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Meu Projeto Incrível"
                autoFocus
                disabled={isLoading}
              />
            </div>

            <div className="space-y-3">
              <Label>Plano</Label>
              <RadioGroup
                value={plan}
                onValueChange={(value) => setPlan(value as ProjectPlan)}
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
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim() || isLoading}>
              {isLoading ? "Criando..." : "Criar Projeto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
