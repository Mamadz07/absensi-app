CREATE TABLE `absensi` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`nama` text NOT NULL,
	`tanggal` text NOT NULL,
	`status` text NOT NULL,
	`keterangan` text,
	`checkin` text,
	`checkout` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nama` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL
);
