import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres("postgresql://law:rPN-9fz8Tj0c8OF--DJmDQ@mauve-cricket-13002.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/tp_iot?sslmode=verify-full");

export const db: PostgresJsDatabase = drizzle(queryClient);

export type DBClient = typeof db;