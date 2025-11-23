import { Button } from "@/components/ui/button";

interface EmailSentSuccessProps {
  email: string;
  onTryAnother: () => void;
}

export function EmailSentSuccess({ email, onTryAnother }: EmailSentSuccessProps) {
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
          <Button variant="outline" onClick={onTryAnother} className="w-full">
            Tentar outro email
          </Button>
        </div>
      </div>
    </section>
  );
}
