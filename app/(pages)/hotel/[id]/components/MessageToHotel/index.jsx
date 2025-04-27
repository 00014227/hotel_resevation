'use client';

import { supabase } from '@/app/lib/supabaseClient';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function MesssageToTheHotel({ admin_id }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const { userTable } = useSelector((state) => state.auth); // Assuming you store user info in Redux

  const handleSendMessage = async () => {
    if (!message.trim()) return;
 
    setSending(true);

    const { data, error } = await supabase.from('messages').insert([
      {
        user_id: userTable.id, // the user who is sending
        sender_id: userTable.id, // user sends the message
        sender_role: 'user',
        message,
      },
    ]);

    setSending(false);

    if (error) {
      console.error('Error sending message:', error.message);
      alert('Failed to send message');
    } else {
      setMessage('');
      alert('Message sent to hotel admin!');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Send a Message to the Hotel</h2>
      <textarea
        className="w-full border rounded-lg p-2 text-sm"
        rows={4}
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleSendMessage}
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
}
