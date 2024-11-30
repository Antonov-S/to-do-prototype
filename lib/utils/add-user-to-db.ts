import { db } from "../db";
import { users } from "../schema";

export async function addUserToDb(username: string, saltedPassword: string) {
  const user = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      name: username,
      password: saltedPassword
    })
    .returning();
  return user.pop();
}
