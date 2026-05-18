import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const absensi = sqliteTable("absensi", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nama: text("nama").notNull(),
  tanggal: text("tanggal").notNull(),
  status: text("status").notNull(),
});