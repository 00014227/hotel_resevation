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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {hotels.map((hotel) => {
        const isSelected = selectedHotels.some((selected) => selected.id === hotel.id);

        return (
          <div
            key={hotel.id}
            onClick={() => dispatch(toggleHotelSelection(hotel))} // Pass the whole hotel object
            className={`border p-4 rounded-lg cursor-pointer transition-all ${
              isSelected ? "bg-blue-100 border-blue-500" : "bg-white"
            }`}
          >
            <Image
            width={400}
            height={300}
              src={hotel.image_url[0]}
              alt={hotel.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="font-semibold mt-2">{hotel.name}</h3>
            <p className="text-sm text-gray-500">{hotel.location}</p>
            <p className="font-bold">{hotel.price}</p>

            {/* Show buttons only if hotel is selected */}
            {isSelected && (
              <div className="mt-2 flex gap-2">
                <DescribeButton hotel={hotel} hotelId={hotel.id} />
                <Button variant="outline">Compare</Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
