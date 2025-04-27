'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Currency } from 'lucide-react';

export default function SuccessPayment() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount')
  const router = useRouter();

  useEffect(() => {
    const insertPayment = async () => {
      if (!bookingId) return;

      // ✅ 1. Get booking details
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('id, room_id, user_id')
        .eq('id', bookingId)
        .single();

        console.log(booking, 'booooo')
      if (bookingError || !booking) {
        toast.error('Failed to fetch booking');
        return;
      }

      // ✅ 2. Insert payment record
      const { error: paymentError } = await supabase.from('payments').insert({
        booking_id: booking.id,
        user_id: booking.user_id,
        amount: Number(amount),
        status: 'paid',
        currency: '1000',
        stripe_id: '1',
        created_at: new Date().toISOString(),
      });

      if (paymentError) {
        toast.error('Payment insert failed', paymentError.message);
        console.log('Payment insert failed', paymentError.message)
      } else {
        toast.success('Payment successful!');
        // ✅ 3. Optionally update booking status to 'confirmed'
        await supabase
          .from('bookings')
          .update({ status: 'confirmed' })
          .eq('id', booking.id);
      }
    };

    insertPayment();
  }, [bookingId]);

  return (
    <div>
      You are molodec
    </div>
  )
}
