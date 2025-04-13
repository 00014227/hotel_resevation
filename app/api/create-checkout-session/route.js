import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Reservation for ${body.name} ${body.surname}`,
          },
          unit_amount: body.price * 100, // convert to cents
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/reserve`,
    metadata: {
      email: body.email,
      phone: body.phone,
      country: body.country,
    },
  });

  return new Response(JSON.stringify({ id: session.id }), { status: 200 });
}
