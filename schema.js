import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const data = pgTable("data", {
    id: integer("id"),
    time: timestamp("time"),
    value: integer("value"),
    });