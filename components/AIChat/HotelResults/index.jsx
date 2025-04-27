import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DescribeButton from "./components/DescribeBtn";
import { Button } from "@/components/ui/button";
import { toggleHotelSelection } from "@/app/lib/features/AIChat/aichat.slice";
import Image from "next/image";

export default function HotelResults() {
  const dispatch = useDispatch();
  const { hotels, selectedHotels } = useSelector((state) => state.aichat);


  return (
    <div className="flex gap-6   overflow-y-auto">
      {hotels.map((hotel) => {
        const isSelected = selectedHotels.some((selected) => selected.id === hotel.id);

        return (
          <div
            key={hotel.id}
            onClick={() => dispatch(toggleHotelSelection(hotel))}
            className={`group border p-4 rounded-2xl cursor-pointer transition-all w-[20rem] duration-300 shadow-md hover:shadow-xl ${isSelected ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                width={400}
                height={300}
                src={hotel.image_url[0]}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-between items-center">
            <h3 className="font-semibold mt-4 text-lg">{hotel.name}</h3>
            <p className="text-sm text-gray-500">{hotel.location}</p>
            <p className="font-bold text-gray-700 mt-2">{hotel.price}</p>
              </div>
            {isSelected && (
              <div className="mt-4 flex gap-2">
                <DescribeButton hotel={hotel} hotelId={hotel.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>

  );
}
