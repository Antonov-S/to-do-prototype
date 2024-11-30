import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";

export async function getUserFromDb(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.name, username)
  });
  return user;
}
