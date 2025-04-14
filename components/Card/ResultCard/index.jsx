import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar } from "react-icons/fa";

export default function ResultCard({ hotels, checkIn, checkOut }) {
    console.log('ReusltDate', checkIn)
    return (
        <>
            {hotels?.data?.map((hotel) => (
      <li
      key={hotel.id}
      className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden max-w-sm w-full lg:max-w-3xl flex flex-col lg:flex-row mb-4 bg-white"
    >
      {/* Hotel Image */}
      <Link
        href={{
          pathname: `/hotel/${hotel.id}`,
          query: { checkIn, checkOut },
        }}
        passHref
        className="w-full lg:w-1/2"
      >
        <Image
          width={1200}      // Approximate full width (desktop)
          height={256}
          src={Array.isArray(hotel.image_url) ? hotel.image_url[0] : hotel.image_url}
          alt={hotel.name}
          className="h-64 lg:h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
    
      {/* Hotel Details */}
      <div className="p-5 flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="font-medium text-gray-700">{hotel.rating}</span>
            </div>
          </div>
    
          <p className="text-gray-600 text-sm mb-1">
            {hotel.address?.street}, {hotel.address?.region}
          </p>
    
          <p className="text-gray-700 text-sm line-clamp-3">{hotel.description}</p>
        </div>
    
        {/* Price & CTA */}
        <div className="mt-4 flex flex-col items-end gap-1">
          <p className="text-lg font-bold text-gray-800">${hotel.price}</p>
          <p className="text-xs text-gray-500">Includes taxes & fees</p>
          <Button className="bg-red-500 hover:bg-red-600 text-white mt-2">Check Places</Button>
        </div>
      </div>
    </li>
    
            ))}
        </>
    );
}
