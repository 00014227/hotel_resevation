import React from "react";
import RoomPopUp from "./RoomPopUp";
import { useParams, useSearchParams } from "next/navigation";

export default function RoomResults({ rooms = [] }) {  // Default to an empty array
  if (!rooms || rooms.length === 0) {
    return <p className="text-gray-500 text-center">Нет доступных номеров</p>;
  }
  const params = useParams();

  const searchParams = useSearchParams()


  const checkInStr = searchParams.get('checkIn');
  const checkOutStr = searchParams.get('checkOut');
  const id = params.id

  const checkIn = checkInStr ? new Date(checkInStr) : null;
  const checkOut = checkOutStr ? new Date(checkOutStr) : null;

  let numberOfNights = 1;
  if (checkIn && checkOut) {
    const diffTime = Math.abs(checkOut - checkIn);
    numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  console.log(numberOfNights, 'nummmmm')

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Тип номера</th>
            <th className="px-4 py-2 text-center">Число гостей</th>
            <th className="px-4 py-2 text-right">Цена за ночь</th>
            <th className="px-4 py-2 text-right">Цена за {numberOfNights} ночей</th> {/* ✅ New column */}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index} className="border-t">
              {/* Room Info */}
              <td className="p-4 align-top">
                <RoomPopUp room={room} numberOfNights={numberOfNights} hotelId={id} />
                <p className="text-gray-600 text-sm">{room.bedType} 🛏</p>
                <div className="flex flex-wrap gap-2 mt-2 text-gray-500 text-xs">
                  {room.amenities?.map((amenity, i) => (
                    <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </td>

              {/* Guest Capacity */}
              <td className="p-4 text-center">
                {"👤".repeat(room.max_guests || 1)}
              </td>

              {/* Price Per Night */}
              <td className="p-4 text-right">
                <p className="text-lg font-bold text-gray-800">
                  USD {room.price?.toLocaleString() || "0"}
                </p>
                <p className="text-gray-500 text-sm">+ налоги и сборы</p>
              </td>

              {/* ✅ Total Price for N Nights */}
              <td className="p-4 text-right">
                <p className="text-lg font-bold text-green-700">
                  USD {(room.price * numberOfNights).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">за {numberOfNights} ночей</p>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
