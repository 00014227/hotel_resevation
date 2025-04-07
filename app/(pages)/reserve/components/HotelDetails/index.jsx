import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarDays, BedSingle, Users, ShowerHead, HotTub } from 'lucide-react';
import {  useSearchParams } from 'next/navigation';
import { fetchHotelById } from '@/app/lib/features/hotelDetails/hotelDetails.thunk';

export default function HotelDetail() {


    const searchParams = useSearchParams()

    const dispatch = useDispatch()

    useEffect(() => {
        const id = searchParams.get('hotelId')


        dispatch(fetchHotelById(id))
        // dispatch(fetchActiveHotelRooms({ checkIn, checkOut, id }))
    }, [searchParams]);
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')

  const hotel = useSelector((state) => state.hotelDetail.hotel);
    console.log(hotel, 'ddfdfdfd')
  if (!hotel) return <div className="text-center text-gray-500">Loading hotel details...</div>;

  return (
    <div className=" max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
<img
  src={hotel?.data?.image_url?.[0] || '/placeholder.jpg'}
  alt={hotel?.name || 'Hotel Image'}
  className="w-full h-64 object-cover"
/>
    
      <div className="p-6 space-y-3">
        <div>
          <h2 className="text-xl font-bold">{hotel.name}</h2>
          <p className="text-sm text-gray-600">{hotel.location}</p>
          <p className="text-sm font-semibold mt-1">
            <span className="text-blue-600">{hotel.rating}/10</span> - <span className="text-green-700">Excellent</span> ({hotel.reviews} reviews)
          </p>
        </div>

        {hotel.nonRefundable && (
          <p className="text-sm text-red-500 font-medium">Non-Refundable</p>
        )}

        <div className="border-t pt-4 text-sm text-gray-700">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-semibold">Check-in</p>
              <p>{checkIn}</p>
            </div>
            <div>
              <p className="font-semibold">Check-out</p>
              <p>{checkOut}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="font-semibold mb-1">{hotel.room}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <div className="flex items-center gap-1"><BedSingle className="w-4 h-4" /> {hotel.bed}</div>
            <div className="flex items-center gap-1"><Users className="w-4 h-4" /> Sleeps {hotel.sleeps}</div>
            {/* {hotel.amenities.includes('Pool') && (
              <div className="flex items-center gap-1"><ShowerHead className="w-4 h-4" /> Pool</div>
            )}
            {hotel.amenities.includes('Hot Tub') && (
              <div className="flex items-center gap-1"><HotTub className="w-4 h-4" /> Hot Tub</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
