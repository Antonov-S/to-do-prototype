import Link from "next/link";
import { HomeIcon, StarIcon, SunIcon } from "@radix-ui/react-icons";
import { TaskCounts } from "@/types/task-counts";

type SidebarProps = {
  onClick: () => void;
  taskCounts: TaskCounts;
};

export default function Sidebar({ onClick, taskCounts }: SidebarProps) {
  return (
    <div className="p-5">
      <ul className="flex flex-col gap-5">
        <li>
          <Link
            href="/myday"
            className="flex gap-2 items-center justify-between"
            onClick={() => onClick()}
          >
            <div className="flex gap-5">
              <SunIcon className="w-6 h-6 text-accent-green-foreground" /> My
              Day
            </div>

            <div className="text-muted-foreground">{taskCounts.myDay ?? 0}</div>
          </Link>
        </li>
        <li>
          <Link
            href="/important"
            className="flex gap-2 items-center justify-between"
            onClick={() => onClick()}
          >
            <div className="flex gap-5">
              <StarIcon className="w-6 h-6 text-accent-pink-foreground" />
              Important
            </div>

            <div className="text-muted-foreground">
              {taskCounts.important ?? 0}
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/tasks"
            className="flex gap-2 items-center justify-between"
            onClick={() => onClick()}
          >
            <div className="flex gap-5">
              <HomeIcon className="w-6 h-6 text-accent-blue-foreground" />
              Tasks
            </div>

            <div className="text-muted-foreground">{taskCounts.tasks ?? 0}</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
