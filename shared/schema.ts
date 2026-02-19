import { pgTable, text, timestamp, uuid, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contacts table for contact form submissions
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

// Subscribers table for newsletter
export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

// Tour dates table
export const tourDates = pgTable("tour_dates", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: text("date").notNull(),
  venue: text("venue").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  ticketUrl: text("ticket_url"),
  isSoldOut: boolean("is_sold_out").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTourDateSchema = createInsertSchema(tourDates).omit({
  id: true,
  createdAt: true,
});

export type TourDate = typeof tourDates.$inferSelect;
export type InsertTourDate = z.infer<typeof insertTourDateSchema>;

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;

// Music releases table
export const musicReleases = pgTable("music_releases", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'single', 'album', 'ep'
  releaseDate: text("release_date"),
  coverUrl: text("cover_url"),
  spotifyUrl: text("spotify_url"),
  appleMusicUrl: text("apple_music_url"),
  youtubeUrl: text("youtube_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMusicReleaseSchema = createInsertSchema(musicReleases).omit({
  id: true,
  createdAt: true,
});

export type MusicRelease = typeof musicReleases.$inferSelect;
export type InsertMusicRelease = z.infer<typeof insertMusicReleaseSchema>;

// Press quotes table
export const pressQuotes = pgTable("press_quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  quote: text("quote").notNull(),
  source: text("source").notNull(),
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPressQuoteSchema = createInsertSchema(pressQuotes).omit({
  id: true,
  createdAt: true,
});

export type PressQuote = typeof pressQuotes.$inferSelect;
export type InsertPressQuote = z.infer<typeof insertPressQuoteSchema>;
