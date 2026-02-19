import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { insertContactSchema, insertSubscriberSchema, insertTourDateSchema, insertMusicReleaseSchema, insertPressQuoteSchema } from "@shared/schema";
import { z } from "zod";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { db } from "./db";
import { sql } from "drizzle-orm";

declare module "express-session" {
  interface SessionData {
    adminId?: string;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const PgSession = connectPgSimple(session);

  app.use(
    session({
      store: new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    })
  );

  await seedAdmin();

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid form data" });
      }
      const contact = await storage.createContact(parsed.data);
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const parsed = insertSubscriberSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid email" });
      }
      const existing = await storage.getSubscriberByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ error: "Already subscribed" });
      }
      const subscriber = await storage.createSubscriber(parsed.data);
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  app.get("/api/tour-dates", async (_req, res) => {
    try {
      const dates = await storage.getTourDates();
      res.json(dates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tour dates" });
    }
  });

  app.get("/api/music-releases", async (_req, res) => {
    try {
      const releases = await storage.getMusicReleases();
      res.json(releases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch music releases" });
    }
  });

  app.get("/api/press-quotes", async (_req, res) => {
    try {
      const quotes = await storage.getPressQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch press quotes" });
    }
  });

  // Admin auth
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      req.session.adminId = admin.id;
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    if (req.session.adminId) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  // Admin: Tour Dates
  app.post("/api/admin/tour-dates", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTourDateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
      const result = await storage.createTourDate(parsed.data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tour date" });
    }
  });

  app.put("/api/admin/tour-dates/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTourDateSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
      const result = await storage.updateTourDate(req.params.id, parsed.data);
      if (!result) return res.status(404).json({ error: "Not found" });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update tour date" });
    }
  });

  app.delete("/api/admin/tour-dates/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteTourDate(req.params.id);
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tour date" });
    }
  });

  // Admin: Music Releases
  app.post("/api/admin/music-releases", requireAdmin, async (req, res) => {
    try {
      const parsed = insertMusicReleaseSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
      const result = await storage.createMusicRelease(parsed.data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create music release" });
    }
  });

  app.put("/api/admin/music-releases/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertMusicReleaseSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
      const result = await storage.updateMusicRelease(req.params.id, parsed.data);
      if (!result) return res.status(404).json({ error: "Not found" });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update" });
    }
  });

  app.delete("/api/admin/music-releases/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteMusicRelease(req.params.id);
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete" });
    }
  });

  // Admin: Press Quotes
  app.post("/api/admin/press-quotes", requireAdmin, async (req, res) => {
    try {
      const parsed = insertPressQuoteSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
      const result = await storage.createPressQuote(parsed.data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create press quote" });
    }
  });

  app.put("/api/admin/press-quotes/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertPressQuoteSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data" });
      const result = await storage.updatePressQuote(req.params.id, parsed.data);
      if (!result) return res.status(404).json({ error: "Not found" });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update" });
    }
  });

  app.delete("/api/admin/press-quotes/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePressQuote(req.params.id);
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete" });
    }
  });

  // Admin: Subscribers
  app.get("/api/admin/subscribers", requireAdmin, async (_req, res) => {
    try {
      const subs = await storage.getSubscribers();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  app.get("/api/admin/subscribers/export", requireAdmin, async (_req, res) => {
    try {
      const subs = await storage.getSubscribers();
      const csv = "email,subscribed_at\n" +
        subs.map((s) => `${s.email},${s.createdAt?.toISOString() || ""}`).join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=subscribers.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export subscribers" });
    }
  });

  // Stripe: Get publishable key
  app.get("/api/stripe/publishable-key", async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error) {
      res.status(500).json({ error: "Failed to get Stripe key" });
    }
  });

  // Stripe: List fan club membership products with prices
  app.get("/api/fan-club/products", async (_req, res) => {
    try {
      const result = await db.execute(sql`
        SELECT 
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.metadata as product_metadata,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.metadata as price_metadata
        FROM stripe.products p
        JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        WHERE p.active = true AND p.metadata->>'category' = 'fan-club'
        ORDER BY pr.unit_amount ASC
      `);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching fan club products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Stripe: Create checkout session for fan club membership
  app.post("/api/fan-club/checkout", async (req, res) => {
    try {
      const { priceId, email } = req.body;
      if (!priceId || !email || !z.string().email().safeParse(email).success) {
        return res.status(400).json({ error: "Valid price ID and email required" });
      }

      const allowedPrices = await db.execute(sql`
        SELECT pr.id FROM stripe.prices pr
        JOIN stripe.products p ON pr.product = p.id
        WHERE p.metadata->>'category' = 'fan-club' AND pr.active = true AND p.active = true
      `);
      const allowedPriceIds = allowedPrices.rows.map((r: any) => r.id);
      if (!allowedPriceIds.includes(priceId)) {
        return res.status(400).json({ error: "Invalid price selected" });
      }

      const stripe = await getUncachableStripeClient();

      const customers = await stripe.customers.list({ email, limit: 1 });
      let customerId: string;
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({ email });
        customerId = customer.id;
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${baseUrl}/fan-club?success=true`,
        cancel_url: `${baseUrl}/fan-club?canceled=true`,
        metadata: { tier: "premium" },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Checkout error:", error.message);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Stripe: Customer portal for managing subscription
  // Requires email match with an active subscription for verification
  app.post("/api/fan-club/portal", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !z.string().email().safeParse(email).success) {
        return res.status(400).json({ error: "Valid email required" });
      }

      const stripe = await getUncachableStripeClient();
      const customers = await stripe.customers.list({ email, limit: 1 });

      if (customers.data.length === 0) {
        return res.status(404).json({ error: "No subscription found for this email" });
      }

      const customer = customers.data[0];
      if (customer.email !== email) {
        return res.status(404).json({ error: "No subscription found for this email" });
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 1,
      });

      if (subscriptions.data.length === 0) {
        return res.status(404).json({ error: "No subscription found for this email" });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${baseUrl}/fan-club`,
      });

      res.json({ url: portalSession.url });
    } catch (error: any) {
      console.error("Portal error:", error.message);
      res.status(500).json({ error: "Failed to create portal session" });
    }
  });

  // Stripe: Check subscription status by email
  app.post("/api/fan-club/status", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.json({ tier: "free", active: false });
      }

      const stripe = await getUncachableStripeClient();
      const customers = await stripe.customers.list({ email, limit: 1 });

      if (customers.data.length === 0) {
        return res.json({ tier: "free", active: false });
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[0].id,
        status: "active",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        return res.json({
          tier: "premium",
          active: true,
          currentPeriodEnd: subscriptions.data[0].current_period_end,
        });
      }

      res.json({ tier: "free", active: false });
    } catch (error) {
      console.error("Status check error:", error);
      res.json({ tier: "free", active: false });
    }
  });

  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://seanaustinmusic.com";
    const pages = [
      { path: "/", priority: "1.0", changefreq: "weekly" },
      { path: "/music", priority: "0.9", changefreq: "weekly" },
      { path: "/videos", priority: "0.8", changefreq: "weekly" },
      { path: "/tour", priority: "0.9", changefreq: "daily" },
      { path: "/about", priority: "0.7", changefreq: "monthly" },
      { path: "/contact", priority: "0.6", changefreq: "monthly" },
      { path: "/epk", priority: "0.8", changefreq: "monthly" },
      { path: "/merch", priority: "0.8", changefreq: "weekly" },
      { path: "/fan-club", priority: "0.8", changefreq: "monthly" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  return httpServer;
}

async function seedAdmin() {
  try {
    const count = await storage.getAdminCount();
    if (count > 0) return;
    const hash = await bcrypt.hash("admin123", 10);
    await storage.createAdmin("admin", hash);
    console.log("Default admin created (username: admin, password: admin123)");
  } catch (err) {
    console.error("Failed to seed admin:", err);
  }
}
