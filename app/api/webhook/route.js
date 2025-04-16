
import { supabase } from '@/app/lib/supabaseClient';
import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const rawBody = await req.arrayBuffer();
  const body = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('[Webhook Signature Error]', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Handle checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { booking_id, user_id } = session.metadata;

    // Insert payment record
    const { error: paymentError } = await supabase.from('payments').insert({
      booking_id,
      user_id,
      stripe_session_id: session.id,
      amount: session.amount_total,
      currency: session.currency,
      status: 'paid',
      created_at: new Date().toISOString(),
    });

    if (paymentError) {
      console.error('[Payment Insert Error]', paymentError.message);
      return new Response('Failed to save payment', { status: 500 });
    }

    // Update booking status
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', booking_id);

    if (updateError) {
      console.error('[Booking Update Error]', updateError.message);
      return new Response('Failed to update booking', { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
