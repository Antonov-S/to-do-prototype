"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";

export default async function CompleteTask(
  taskId: number,
  isComplete: boolean
) {
  const session = await auth();
  if (!session) {
    return {
      message: "Unauthenticated"
    };
  }

  await db
    .update(tasks)
    .set({
      isComplete: isComplete
    })
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, session.user.id)));
  revalidatePath("/tasks");
}
