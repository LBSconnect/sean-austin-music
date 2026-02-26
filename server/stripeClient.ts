import Stripe from 'stripe';

let cachedClient: Stripe | null = null;

function getClient(): Stripe {
  if (!cachedClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) throw new Error('STRIPE_SECRET_KEY environment variable is required');
    cachedClient = new Stripe(secretKey);
  }
  return cachedClient;
}

export async function getCachedStripeClient(): Promise<Stripe> {
  return getClient();
}

export async function getUncachableStripeClient(): Promise<Stripe> {
  return getClient();
}

export async function getStripePublishableKey(): Promise<string> {
  return process.env.STRIPE_PUBLISHABLE_KEY || '';
}
