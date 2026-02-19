import { db } from "./db";
import {
  contacts,
  subscribers,
  tourDates,
  adminUsers,
  musicReleases,
  pressQuotes,
  type InsertContact,
  type InsertSubscriber,
  type InsertTourDate,
  type InsertMusicRelease,
  type InsertPressQuote,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Contacts
  createContact(data: InsertContact): Promise<typeof contacts.$inferSelect>;

  // Subscribers
  createSubscriber(data: InsertSubscriber): Promise<typeof subscribers.$inferSelect>;
  getSubscriberByEmail(email: string): Promise<typeof subscribers.$inferSelect | null>;
  getSubscribers(): Promise<(typeof subscribers.$inferSelect)[]>;

  // Tour dates
  getTourDates(): Promise<(typeof tourDates.$inferSelect)[]>;
  createTourDate(data: InsertTourDate): Promise<typeof tourDates.$inferSelect>;
  updateTourDate(id: string, data: Partial<InsertTourDate>): Promise<typeof tourDates.$inferSelect | null>;
  deleteTourDate(id: string): Promise<void>;

  // Admin users
  getAdminByUsername(username: string): Promise<typeof adminUsers.$inferSelect | null>;
  getAdminCount(): Promise<number>;
  createAdmin(username: string, passwordHash: string): Promise<typeof adminUsers.$inferSelect>;

  // Music releases
  getMusicReleases(): Promise<(typeof musicReleases.$inferSelect)[]>;
  createMusicRelease(data: InsertMusicRelease): Promise<typeof musicReleases.$inferSelect>;
  updateMusicRelease(id: string, data: Partial<InsertMusicRelease>): Promise<typeof musicReleases.$inferSelect | null>;
  deleteMusicRelease(id: string): Promise<void>;

  // Press quotes
  getPressQuotes(): Promise<(typeof pressQuotes.$inferSelect)[]>;
  createPressQuote(data: InsertPressQuote): Promise<typeof pressQuotes.$inferSelect>;
  updatePressQuote(id: string, data: Partial<InsertPressQuote>): Promise<typeof pressQuotes.$inferSelect | null>;
  deletePressQuote(id: string): Promise<void>;
}

class DatabaseStorage implements IStorage {
  // Contacts
  async createContact(data: InsertContact) {
    const [contact] = await db.insert(contacts).values(data).returning();
    return contact;
  }

  // Subscribers
  async createSubscriber(data: InsertSubscriber) {
    const [subscriber] = await db.insert(subscribers).values(data).returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string) {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber || null;
  }

  async getSubscribers() {
    return db.select().from(subscribers);
  }

  // Tour dates
  async getTourDates() {
    return db.select().from(tourDates);
  }

  async createTourDate(data: InsertTourDate) {
    const [tourDate] = await db.insert(tourDates).values(data).returning();
    return tourDate;
  }

  async updateTourDate(id: string, data: Partial<InsertTourDate>) {
    const [tourDate] = await db.update(tourDates).set(data).where(eq(tourDates.id, id)).returning();
    return tourDate || null;
  }

  async deleteTourDate(id: string) {
    await db.delete(tourDates).where(eq(tourDates.id, id));
  }

  // Admin users
  async getAdminByUsername(username: string) {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin || null;
  }

  async getAdminCount() {
    const result = await db.select().from(adminUsers);
    return result.length;
  }

  async createAdmin(username: string, passwordHash: string) {
    const [admin] = await db.insert(adminUsers).values({ username, passwordHash }).returning();
    return admin;
  }

  // Music releases
  async getMusicReleases() {
    return db.select().from(musicReleases);
  }

  async createMusicRelease(data: InsertMusicRelease) {
    const [release] = await db.insert(musicReleases).values(data).returning();
    return release;
  }

  async updateMusicRelease(id: string, data: Partial<InsertMusicRelease>) {
    const [release] = await db.update(musicReleases).set(data).where(eq(musicReleases.id, id)).returning();
    return release || null;
  }

  async deleteMusicRelease(id: string) {
    await db.delete(musicReleases).where(eq(musicReleases.id, id));
  }

  // Press quotes
  async getPressQuotes() {
    return db.select().from(pressQuotes);
  }

  async createPressQuote(data: InsertPressQuote) {
    const [quote] = await db.insert(pressQuotes).values(data).returning();
    return quote;
  }

  async updatePressQuote(id: string, data: Partial<InsertPressQuote>) {
    const [quote] = await db.update(pressQuotes).set(data).where(eq(pressQuotes.id, id)).returning();
    return quote || null;
  }

  async deletePressQuote(id: string) {
    await db.delete(pressQuotes).where(eq(pressQuotes.id, id));
  }
}

export const storage = new DatabaseStorage();
