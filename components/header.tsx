import Link from "next/link";
import { CheckboxIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "./mode-toggle";
import AvatarMenu from "./avatar-menu";

export default function Header() {
  return (
    <div className="flex justify-between p-5 border-b-2">
      <Link href="/">
        <CheckboxIcon className="h-8 w-8" />
      </Link>
      <div className="flex gap-5">
        <ModeToggle />
        <AvatarMenu />
      </div>
    </div>
  );
}
