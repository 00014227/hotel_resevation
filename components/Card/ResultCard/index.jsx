import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { FaStar } from "react-icons/fa";

export default function ResultCard({ hotels, checkIn, checkOut }) {
    console.log('ReusltDate', checkIn)
    return (
        <>
            {hotels?.data?.map((hotel) => (
                <li key={hotel.id} className="border max-w-sm w-full lg:max-w-3xl rounded-xl lg:flex mb-2">
                    {/* Display Hotel Image */}
                    <Link href={{
                        pathname:`/hotel/${hotel.id}`,
                        query: {checkIn, checkOut}
                        }} passHref>
                    
                    <img
                        src={Array.isArray(hotel.image_url) ? hotel.image_url[0] : hotel.image_url}
                        alt={hotel.name}
                        width={300}
                        height={300}
                        className="w-1/3 rounded-s-xl h-auto object-cover"
                    />
                    </Link>
                    {/* Hotel Details */}
                    <div className='p-4 w-full'>
                        <div className='flex items-center justify-between w-full'>
                            <h2 className="text-lg font-bold">{hotel.name}</h2>
                            <div className='flex gap-1 items-center'>
                                <FaStar className='text-yellow-400' />
                                <span>{hotel.rating}</span>
                            </div>
                        </div>

                        <p>{hotel.address?.street}, {hotel.address?.region}</p>
                        <p>{hotel.description}</p>

                        {/* Pricing & CTA */}
                        <div className='flex flex-col items-end space-y-2 mt-3'>
                            <p className='text-lg font-semibold'>$ {hotel.price}</p>
                            <p className='text-sm text-gray-500'>Includes taxes & fees</p>
                            <Button className="bg-red-500">Check places</Button>
                        </div>
                    </div>
                </li>
            ))}
        </>
    );
}
