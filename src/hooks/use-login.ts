import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function useLogin() {
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

  const resetForm = () => {
    setIsSuccess(false);
    setEmail("");
  };

  return {
    email,
    setEmail,
    isLoading,
    isSuccess,
    error,
    handleMagicLink,
    resetForm,
  };
}
