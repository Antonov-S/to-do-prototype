"use client";

import { KeyboardEvent, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createTask, CreateTaskSchema } from "@/actions/create-task";

type AddTaskProps = {
  className: string;
  isImportant?: boolean;
  isMyDay?: boolean;
};

export default function AddTask({
  className,
  isImportant,
  isMyDay
}: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  async function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const data: CreateTaskSchema = {
        title: title,
        isImportant: isImportant ? true : false
      };
      if (isMyDay) {
        data.addedToMyDayAt = new Date().toISOString();
      }
      await createTask(data);
      setTitle("");
    }
  }

  return (
    <div>
      {isAdding ? (
        <Input
          type="text"
          name="title"
          placeholder="Try adding pay utilities by Friday 6pm"
          onKeyDown={handleKeyDown}
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => setIsAdding(false)}
        />
      ) : (
        <Button className={className} onClick={() => setIsAdding(true)}>
          <PlusIcon /> Add Task
        </Button>
      )}
    </div>
  );
}
