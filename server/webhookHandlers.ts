import { getStripeSync } from './stripeClient';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    const stripeSync = await getStripeSync();

    // Process the webhook through stripe-replit-sync
    await stripeSync.handleWebhook(payload, signature);

    console.log('[Webhook] Processed successfully');
  }
}
