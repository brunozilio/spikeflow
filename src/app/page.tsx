import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/login");
  }

  redirect("/projects");
}
