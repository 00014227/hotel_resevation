'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BellIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { supabase } from '@/app/lib/supabaseClient';

export default function HotelNotification() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHotelMessages, setSelectedHotelMessages] = useState([]);
  const [hotelDialogOpen, setHotelDialogOpen] = useState(false);

  const { userTable } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userTable?.id) return;

    const fetchResponses = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:user (name)
        `)
        .eq('user_id', userTable.id)
        .eq('sender_role', 'admin')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error.message);
      } else {
        setMessages(data);
      }
    };

    fetchResponses();
  }, [userTable]);

  const groupedByHotel = messages.reduce((acc, msg) => {
    const hotelId = msg.sender_id;
    if (!acc[hotelId]) acc[hotelId] = [];
    acc[hotelId].push(msg);
    return acc;
  }, {});

  const handleHotelClick = (hotelId) => {
    setSelectedHotelMessages(groupedByHotel[hotelId]);
    setHotelDialogOpen(true);
  };

  if (messages.length === 0) return null;

  return (
    <>
      {/* Bell Icon */}
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        size="icon"
        className="relative rounded-full hover:bg-gray-100"
      >
        <BellIcon className="w-6 h-6 text-gray-600" />
        {messages.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>

      {/* Main notification popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-gray-800">New Messages</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            {Object.keys(groupedByHotel).map(hotelId => (
              <Button
                key={hotelId}
                onClick={() => handleHotelClick(hotelId)}
                className="justify-start bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-4 text-left shadow-sm transition"
              >
                📩 Message from Hotel ({hotelId.slice(0, 8)}...)
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed hotel message popup */}
{/* Detailed hotel message popup */}
<Dialog open={hotelDialogOpen} onOpenChange={setHotelDialogOpen}>
  <DialogContent className="max-w-2xl rounded-2xl p-8">
    <DialogHeader>
      <DialogTitle className="text-center text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
        🏨 Hotel Messages
      </DialogTitle>
      <p className="text-center text-gray-500 text-sm mt-2">
        Read the latest updates from the hotel team
      </p>
    </DialogHeader>

    <div className="mt-6 flex flex-col gap-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-2">
      {selectedHotelMessages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
        >
          <div className="text-gray-800 text-base">{msg.message}</div>
          <div className="text-xs text-gray-400 mt-2 text-right">
            {new Date(msg.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  </DialogContent>
</Dialog>

    </>
  );
}
