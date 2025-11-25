import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const [projectData] = await db
      .select()
      .from(project)
      .where(and(eq(project.id, id), eq(project.userId, session.user.id)))
      .limit(1);

    if (!projectData) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(projectData);
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { isArchived, name } = body;

    const updateData: Partial<typeof project.$inferInsert> = {};
    if (typeof isArchived !== "undefined") updateData.isArchived = isArchived;
    if (name) updateData.name = name;

    const [updated] = await db
      .update(project)
      .set(updateData)
      .where(and(eq(project.id, id), eq(project.userId, session.user.id)))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
