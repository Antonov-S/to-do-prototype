import { ArrowRightIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "@/components/mode-toggle";
import SignInBtn from "@/components/signin-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col gap-5 text-center">
        <ModeToggle />
        <h1>To Do Prototype</h1>
        {session ? (
          <Link href="/tasks">
            <Button>
              Go to App <ArrowRightIcon className="ml-2" />
            </Button>
          </Link>
        ) : (
          <SignInBtn />
        )}
      </div>
    </div>
  );
}
