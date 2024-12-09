import { Task } from "@/types/task";
import { Checkbox } from "./ui/checkbox";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      {tasks.map(task => (
        <div
          key={task.id}
          className="bg-accent mb-0.5 rounded text-foreground flex items-center"
        >
          <div className="p-3">
            <Checkbox />
          </div>
          <div>{task.title}</div>
        </div>
      ))}
    </div>
  );
}
