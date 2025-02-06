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
                    <ResultCard
                     hotels={hotels.hotels}
                     checkIn={searchParams.get("checkIn")}
                     checkOut={searchParams.get("checkOut")}/>
                  
                </ul>
            </div>
        </Gutter>
    );
}
