import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import AppShell from "@/components/app-shell";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <SessionProvider session={session}>
      <AppShell>{children}</AppShell>
    </SessionProvider>
  );
}
