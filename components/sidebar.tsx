import { HomeIcon, StarIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type SidebarProps = {
  onClick: () => void;
};

export default function Sidebar({ onClick }: SidebarProps) {
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

            <div className="text-muted-foreground">3</div>
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

            <div className="text-muted-foreground">3</div>
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

            <div className="text-muted-foreground">3</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
