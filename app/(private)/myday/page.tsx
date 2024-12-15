import { redirect } from "next/navigation";
import { and, eq, gte } from "drizzle-orm";
import { format } from "date-fns";

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
    where: and(
      eq(tasks.userId, session.user.id),
      eq(tasks.isComplete, false),
      gte(tasks.addedToMyDayAt, format(new Date(), "dd-MM-yyyy"))
    )
  });

  const resCompleted = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session.user.id),
      eq(tasks.isComplete, true),
      gte(tasks.addedToMyDayAt, format(new Date(), "dd-MM-yyyy"))
    )
  });

  return (
    <div className="flex flex-col text-accent-green-foreground p-5 gap-5">
      <h1 className="font-bold text-3xl">My Day</h1>

      {res.length > 0 ? (
        <div>
          <TaskList
            tasks={res}
            accentClassName="text-accent-green-foreground"
          />
        </div>
      ) : (
        <div>Tasks for today</div>
      )}
      <div>
        <TaskListCompleted
          tasks={resCompleted}
          accentClassName="text-accent-green-foreground"
        />
      </div>
      <div>
        <AddTask
          isImportant={true}
          isMyDay={true}
          className="text-accent-green-foreground bg-accent hover:bg-accent/50"
        />
      </div>
    </div>
  );
}
