import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarDays, BedSingle, Users, ShowerHead, HotTub } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { fetchHotelById } from '@/app/lib/features/hotelDetails/hotelDetails.thunk';
import { FaLocationDot } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import Image from 'next/image';

export default function HotelDetail() {


  const searchParams = useSearchParams()

  const dispatch = useDispatch()

  useEffect(() => {
    const id = searchParams.get('hotelId')


    dispatch(fetchHotelById(id))
    // dispatch(fetchActiveHotelRooms({ checkIn, checkOut, id }))
  }, [searchParams, dispatch]);

  const checkInStr = searchParams.get('checkIn')
  const checkOutStr = searchParams.get('checkOut')
  const checkIn = checkInStr ? new Date(checkInStr) : null;
  const checkOut = checkOutStr ? new Date(checkOutStr) : null;

  let numberOfNights = 1;
  if (checkIn && checkOut) {
    const diffTime = Math.abs(checkOut - checkIn);
    numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  const room_name = searchParams.get('room_name')
  const hotelDetail = useSelector((state) => state.hotelDetail.hotel);
  const hotel = hotelDetail?.data[0];  // Accessing the first hotel

  if (!hotel) return <div className="text-center text-gray-500">Loading hotel details...</div>;
  const images = hotel?.image_url || [];
  return (
    <div className=" max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
      {images.length > 0 ? (
        <Image
          width={400}
          height={500}
          src={images[0]}
          alt={hotel?.name || 'Hotel Image'}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="text-center text-gray-500">No images available</div>
      )}

      <div className="p-6 space-y-3">
        <div>
          <h2 className="text-xl font-bold">{hotel.name}</h2>
          <span className="  text-sm text-gray-600 flex gap-1"><FaLocationDot className="text-red-500 mt-1"/>
          {hotel.address.full}</span>
          <p className="text-sm font-semibold mt-1">
            <span className="text-blue-600">{hotel.rating}/10</span> - <span className="text-green-700">Excellent</span> ({hotel.reviews} reviews)
          </p>
        </div>

        {hotel.nonRefundable && (
          <p className="text-sm text-red-500 font-medium">Non-Refundable</p>
        )}

        <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
          <span><span className=" font-bold">Room:</span> {room_name}</span>
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-semibold">Check-in</p>
              <p>{checkInStr}</p>
            </div>
            <div>
              <p className="font-semibold">Check-out</p>
              <p>{checkOutStr}</p>
            </div>
          </div>
          <div></div>
          <span className="font-bold mt-2">Total length of stay:</span>
          <span className="ml-2">{numberOfNights}</span>
        </div>

        <div className="border-t pt-4">
          <p className="font-semibold mb-1">{hotel.room}</p>
          <ul className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              {hotel.amenities.map((amenity) => (
                <li key={index} className="flex items-center text-base"><TiTick /> {amenity}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
