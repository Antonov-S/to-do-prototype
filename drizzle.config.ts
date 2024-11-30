import config from "./lib/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: config.DATABASE_URL
  },
  strict: true,
  verbose: true
});
