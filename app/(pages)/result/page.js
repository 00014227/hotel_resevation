'use client';
import Gutter from '@/components/Gutter';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import ResultCard from '@/components/Card/ResultCard';
import { useSearchParams } from 'next/navigation';
import { searchHotels } from '@/app/lib/features/searchHotel/hotels.thunk';


export default function ResultPage() {
    const searchParams = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const params = {
            country: searchParams.get("country") || "USA",
            city: searchParams.get("city") || "",
            checkIn: searchParams.get("checkIn") || "",
            checkOut: searchParams.get("checkOut") || "",
            includePets: searchParams.get("includePets") === "true",
            totalGuests: Number(searchParams.get("totalGuests")) || 1,
        }

        console.log("Extracted Search Params:", params);

        // Dispatch Redux action or fetch hotels directly
        dispatch(searchHotels(params));

    }, [searchParams])

    const hotels = useSelector((state) => state.hotels);


    // Handle cases where the data might not exist or is empty
    if (!hotels || hotels.length === 0) {
        return <p>No hotels found. Please try searching again.</p>;
    }

    return (
        <Gutter>
            <div>
                <h1>Available Hotels</h1>
                <ul className="flex flex-col justify-center items-center">
                    <ResultCard hotels={hotels.hotels}/>
                    {/* <li className="border max-w-sm w-full lg:max-w-3xl rounded-lg lg:flex mb-2">
                        <img
                            src="https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg"
                            alt='gweg'
                            width={300}
                            height={300}
                            className=" w-1/3 rounded-s-lg h-48 object-cover"
                        />
                        <div className='p-4 w-full'>

                            <div className='flex items-center justify-between w-full'>
                                <h2 className="text-lg font-bold">Grand hotel</h2>
                                <div className='flex gap-1 items-center'>
                                    <FaStar className=' text-yellow-400' />
                                    <span>8.5</span>
                                </div>
                            </div>

                            <p>44 West 63rd Street, New York, USA</p>
                            <p>A luxurious hotel in the heart of New York.</p>

                            <div className=''>
                                <div className='flex flex-col items-end space-y-'>
                                    <p className='text-lg font-semibold'>$ 200</p>
                                    <p className='text-sm'>includes taxes & fees</p>
                                    <Button className="bg-red-500">Check places</Button>
                                </div>
                            </div>

                        </div>
                    </li> */}
                    {/* {hotels.data.map((hotel) => (
                    <li key={hotel.id} className="border max-w-sm w-full lg:max-w-3xl lg:flex mb-2">
                          {hotel.image_url && (
                            <img
                                src={Array.isArray(hotel.image_url) ? hotel.image_url[0] : hotel.image_url}
                                alt={hotel.name}
                                width={300}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div>
                        <h2 className="text-lg font-bold">{hotel.name}</h2>
                        
                        <p>
                            <strong>Price:</strong> ${hotel.description}
                        </p>
                      
                        </div>
                    </li>
                ))} */}
                </ul>
            </div>
        </Gutter>
    );
}
