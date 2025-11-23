import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
    const { isArchived } = await request.json();

    await db
      .update(project)
      .set({ isArchived })
      .where(and(eq(project.id, id), eq(project.userId, session.user.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao arquivar projeto:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
