"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { EmailSentSuccess } from "./components/email-sent-success";
import { LoginForm } from "./components/login-form";

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
      <EmailSentSuccess
        email={email}
        onTryAnother={() => {
          setIsSuccess(false);
          setEmail("");
        }}
      />
    );
  }

  return (
    <LoginForm
      email={email}
      onEmailChange={setEmail}
      onSubmit={handleMagicLink}
      isLoading={isLoading}
      error={error}
    />
  );
}
