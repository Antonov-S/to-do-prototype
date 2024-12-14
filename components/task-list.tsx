"use client";

import { StarFilledIcon, StarIcon, SunIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Task } from "@/types/task";
import { Checkbox } from "./ui/checkbox";
import CompleteTask from "@/actions/complete-task";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updateTask } from "@/actions/update-task";
import { cn } from "@/lib/utils";

type TaskListProps = {
  tasks: Task[];
  accentClassName: string;
};

export default function TaskList({ tasks, accentClassName }: TaskListProps) {
  async function checkTask(task: Task) {
    await CompleteTask(task.id, !task.isComplete);
  }

  async function updateTitle(task: Task, title: string) {
    const data = {
      title: title
    };
    await updateTask(task.id, data);
  }

  async function updateNote(task: Task, note: string) {
    const data = {
      note: note
    };
    await updateTask(task.id, data);
  }

  async function toggleImportant(task: Task) {
    const data = {
      isImportant: !task.isImportant
    };
    await updateTask(task.id, data);
  }

  async function handleRemoveFromMyDay(task: Task) {
    const data = {
      addedToMyDayAt: null
    };
    await updateTask(task.id, data);
  }

  async function handleAddToMyDay(task: Task) {
    const data = {
      addedToMyDayAt: new Date().toISOString()
    };
    await updateTask(task.id, data);
  }

  return (
    <div>
      {tasks.map(task => (
        <div
          key={task.id}
          className="bg-accent mb-0.5 rounded text-foreground flex items-center"
        >
          <div className="p-3">
            <Checkbox
              onClick={() => checkTask(task)}
              checked={task.isComplete ? true : false}
            />
          </div>
          <div className="flex-auto">
            <Drawer>
              <DrawerTrigger
                className={cn(
                  "w-full text-left p-3",
                  task.isComplete && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Task</DrawerTitle>
                </DrawerHeader>
                <div className="p-5 flex flex-col gap-5">
                  <Input
                    type="text"
                    name="title"
                    defaultValue={task.title ?? ""}
                    onChange={e => updateTitle(task, e.target.value)}
                  />

                  <Textarea
                    placeholder="Add note"
                    name="note"
                    defaultValue={task.note ?? ""}
                    onChange={e => updateNote(task, e.target.value)}
                  />

                  {task.addedToMyDayAt &&
                  task.addedToMyDayAt > format(new Date(), "dd-MM-yyyy") ? (
                    <Button
                      className={cn(
                        "bg-accent hover:bg-accent/50",
                        accentClassName
                      )}
                      onClick={() => handleRemoveFromMyDay(task)}
                    >
                      <SunIcon className="mr-2 w-6 h-6" /> Remove from My Day
                    </Button>
                  ) : (
                    <Button
                      className={cn(
                        "bg-accent hover:bg-accent/50",
                        accentClassName
                      )}
                      onClick={() => handleAddToMyDay(task)}
                    >
                      <SunIcon className="mr-2 w-6 h-6" /> Add to My Day
                    </Button>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <Button
            className={cn(accentClassName, `hover:${accentClassName}`)}
            variant="ghost"
            onClick={() => toggleImportant(task)}
          >
            {task.isImportant ? (
              <StarFilledIcon className="w-6 h-6" />
            ) : (
              <StarIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
