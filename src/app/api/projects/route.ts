import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import type { ProjectPlan } from "@/lib/types/project";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const projects = await db
      .select()
      .from(project)
      .where(
        and(eq(project.userId, session.user.id), eq(project.isArchived, false)),
      )
      .orderBy(project.updatedAt);

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { name, plan = "free" } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }

    if (plan !== "free" && plan !== "pro") {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    const newProject = await db
      .insert(project)
      .values({
        id: nanoid(),
        name: name.trim(),
        plan: plan as ProjectPlan,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
