import { getUncachableStripeClient } from '../server/stripeClient';

async function seedProducts() {
  console.log('Seeding Stripe products...');
  
  const stripe = await getUncachableStripeClient();
  
  // Check if products already exist
  const existingProducts = await stripe.products.list({ limit: 10 });
  const existingNames = existingProducts.data.map(p => p.name);
  
  // Single Resume - $14.99 AUD
  if (!existingNames.includes('Single Resume')) {
    const singleProduct = await stripe.products.create({
      name: 'Single Resume',
      description: 'Perfect for one-time applications. 1 Resume + 1 Cover Letter with 7-day editing access.',
      metadata: {
        planType: 'single',
        resumeCredits: '1',
        coverLetterCredits: '1',
        daysValid: '7',
      },
    });
    
    await stripe.prices.create({
      product: singleProduct.id,
      unit_amount: 1499, // $14.99 in cents
      currency: 'aud',
    });
    
    console.log('Created: Single Resume product');
  } else {
    console.log('Single Resume already exists');
  }
  
  // 5 Resume Pack - $29.99 AUD
  if (!existingNames.includes('5 Resume Pack')) {
    const pack5Product = await stripe.products.create({
      name: '5 Resume Pack',
      description: 'Great for active job seekers. 5 Resumes + 5 Cover Letters with 30-day editing access.',
      metadata: {
        planType: 'pack5',
        resumeCredits: '5',
        coverLetterCredits: '5',
        daysValid: '30',
        popular: 'true',
      },
    });
    
    await stripe.prices.create({
      product: pack5Product.id,
      unit_amount: 2999, // $29.99 in cents
      currency: 'aud',
    });
    
    console.log('Created: 5 Resume Pack product');
  } else {
    console.log('5 Resume Pack already exists');
  }
  
  // 10+ Resume Pack - $49.99 AUD
  if (!existingNames.includes('10+ Resume Pack')) {
    const pack10Product = await stripe.products.create({
      name: '10+ Resume Pack',
      description: 'Best value for serious job hunters. Unlimited Resumes & Cover Letters with 90-day editing access.',
      metadata: {
        planType: 'pack10',
        resumeCredits: '-1',
        coverLetterCredits: '-1',
        daysValid: '90',
      },
    });
    
    await stripe.prices.create({
      product: pack10Product.id,
      unit_amount: 4999, // $49.99 in cents
      currency: 'aud',
    });
    
    console.log('Created: 10+ Resume Pack product');
  } else {
    console.log('10+ Resume Pack already exists');
  }
  
  console.log('Stripe products seeded successfully!');
}

seedProducts().catch(console.error);
