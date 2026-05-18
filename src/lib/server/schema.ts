import {
  sqliteTable,
  integer,
  text
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nama: text('nama').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  role: text('role').notNull()
});

export const absensi = sqliteTable('absensi', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  userId: integer('user_id').notNull(),

  nama: text('nama').notNull(),

  tanggal: text('tanggal').notNull(),

  status: text('status').notNull(),

  keterangan: text('keterangan'),

  checkin: text('checkin'),

  checkout: text('checkout')
});