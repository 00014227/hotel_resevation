import { supabase } from '@/app/lib/supabaseClient';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
      const body = await req.json();
      const {
        email,
        name,
        surname,
        phone,
        address,
        city,
        country,
        room_id,
        checkIn,
        checkOut,
        amount,
      } = body;
      if (!email || !amount || !room_id || !checkIn || !checkOut) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), {
          status: 400,
        });
      }
  
      // 1. 🔍 Check if user exists
      const { data: existingUser, error: userFetchError } = await supabase
        .from('user')
        .select('*')
        .eq('email', email)
        .single();
  
      let user_id;
  
      if (existingUser) {
        console.log(existingUser, 'exxxxxxx')
        const { data: updatedUser, error: updateError } = await supabase
          .from('user')
          .update({ name, surname, phone, address, city, country })
          .eq('email', email)
          .select()
          .single();
  
        if (updateError) throw updateError;
        user_id = updatedUser.id;
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('user')
          .insert({ email, name, surname, phone, address, city, country })
          .select()
          .single();
  
        if (insertError) throw insertError;
        user_id = newUser.id;
      }
  
      // 2. 📦 Create Booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id,
          room_id,
          check_in_date: checkIn,
          check_out_date: checkOut,
          status: 'pending',
        })
        .select()
        .single();
  
      if (bookingError) throw bookingError;
  
      // 3. 💳 Create Stripe Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: amount,
              product_data: {
                name: `Hotel Booking - Room ${room_id}`,
              },
            },
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_URL}/success?bookingId=${booking.id}&amount=${amount}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
        metadata: {
          booking_id: booking.id,
          user_id,
        },
      });
  
      return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('[Create Checkout Error]', err);
      return new Response(JSON.stringify({ message: 'Server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }