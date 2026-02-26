import Stripe from 'stripe';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY environment variable is required');

    const stripe = new Stripe(stripeSecretKey);
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        // Payment successful — extend here to grant fan club access, send email, etc.
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        // Subscription changed — extend here to revoke/update fan club access.
        break;
      default:
        // Unhandled event type — safe to ignore
        break;
    }
  }
}
