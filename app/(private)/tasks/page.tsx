import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

import AddTask from "@/components/add-tack";
import TaskList from "@/components/task-list";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import TaskListCompleted from "@/components/task-list-completed";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const res = await db.query.tasks.findMany({
    where: and(eq(tasks.userId, session.user.id), eq(tasks.isComplete, false))
  });

  const resCompleted = await db.query.tasks.findMany({
    where: and(eq(tasks.userId, session.user.id), eq(tasks.isComplete, true))
  });

  return (
    <div className="flex flex-col text-accent-blue-foreground p-5 gap-5">
      <h1 className="font-bold text-3xl">Tasks</h1>

      {res.length > 0 ? (
        <div>
          <TaskList tasks={res} accentClassName="text-accent-blue-foreground" />
        </div>
      ) : (
        <div>
          Task show up here if they aren't part of any lists you've created.
        </div>
      )}
      <div>
        <TaskListCompleted tasks={resCompleted} />
      </div>
      <div>
        <AddTask className="text-accent-blue-foreground bg-accent hover:bg-accent/50" />
      </div>
    </div>
  );
}
