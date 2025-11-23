"use client";

import { useLogin } from "@/hooks/use-login";
import { EmailSentSuccess } from "./components/email-sent-success";
import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  const {
    email,
    setEmail,
    isLoading,
    isSuccess,
    error,
    handleMagicLink,
    resetForm,
  } = useLogin();

  if (isSuccess) {
    return <EmailSentSuccess email={email} onTryAnother={resetForm} />;
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
