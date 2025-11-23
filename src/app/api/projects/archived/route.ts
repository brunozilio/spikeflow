import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const archivedProjects = await db
      .select()
      .from(project)
      .where(
        and(
          eq(project.userId, session.user.id),
          eq(project.isArchived, true)
        )
      )
      .orderBy(project.updatedAt);

    return NextResponse.json(archivedProjects);
  } catch (error) {
    console.error("Erro ao buscar projetos arquivados:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
