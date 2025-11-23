import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const [existingProject] = await db
      .select()
      .from(project)
      .where(and(eq(project.id, id), eq(project.userId, session.user.id)));

    if (!existingProject) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    }

    const newProject = await db.insert(project).values({
      id: nanoid(),
      name: `${existingProject.name} (cópia)`,
      thumbnail: existingProject.thumbnail,
      userId: session.user.id,
    }).returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error("Erro ao duplicar projeto:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
