import { getUncachableStripeClient } from './stripeClient';

async function seedFanClubProducts() {
  const stripe = await getUncachableStripeClient();

  const existing = await stripe.products.search({ query: "name:'Sean Austin Fan Club - Premium'" });
  if (existing.data.length > 0) {
    console.log('Fan Club products already exist, skipping seed');
    return;
  }

  const premiumProduct = await stripe.products.create({
    name: 'Sean Austin Fan Club - Premium',
    description: 'Get exclusive access to unreleased music, private livestreams, early ticket access, behind-the-scenes content, and direct interaction with Sean Austin.',
    metadata: {
      tier: 'premium',
      category: 'fan-club',
    },
  });

  const monthlyPrice = await stripe.prices.create({
    product: premiumProduct.id,
    unit_amount: 999,
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { display_name: 'Monthly' },
  });

  const yearlyPrice = await stripe.prices.create({
    product: premiumProduct.id,
    unit_amount: 7999,
    currency: 'usd',
    recurring: { interval: 'year' },
    metadata: { display_name: 'Yearly (Save 33%)' },
  });

  console.log('Created Premium Fan Club product:', premiumProduct.id);
  console.log('Monthly price:', monthlyPrice.id, '($9.99/mo)');
  console.log('Yearly price:', yearlyPrice.id, '($79.99/yr)');
}

seedFanClubProducts().catch(console.error);
