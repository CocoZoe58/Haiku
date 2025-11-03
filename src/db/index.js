import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
export const db = drizzle({
  // logger: true,
  connection: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
