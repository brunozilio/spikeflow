"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authClient.signIn.magicLink({
        email,
        callbackURL: "/projects",
      });
      setIsSuccess(true);
    } catch (err) {
      setError("Falha ao enviar o link mágico. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="max-w-md m-auto h-fit w-full">
          <div className="p-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/20">
                <svg
                  className="h-8 w-8 text-yellow-600 dark:text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>
            </div>
            <h1 className="mb-2 text-2xl font-semibold">Verifique seu email</h1>
            <p className="text-muted-foreground mb-6">
              Enviamos um link mágico para <strong>{email}</strong>
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Clique no link do email para acessar sua conta.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false);
                setEmail("");
              }}
              className="w-full"
            >
              Tentar outro email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form onSubmit={handleMagicLink} className="max-w-md m-auto h-fit w-full">
        <div className="p-6">
          <div>
            <Link href="/" aria-label="ir para home">
              <Logo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Entrar no Spikeflow
            </h1>
            <p className="text-muted-foreground">
              Digite seu email para receber um link mágico
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Continuar com Email"
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
