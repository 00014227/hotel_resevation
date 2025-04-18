import React from 'react'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import ResultCard from '@/components/Card/ResultCard';
import { useSearchParams } from 'next/navigation';
import { searchHotels } from '@/app/lib/features/searchHotel/hotels.thunk';
import HotelMap from '@/components/Map';
import Gutter from '@/components/Gutter';
import HotelFilter from '@/components/HotelFilter';

export default function ResutUI() {
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

    }, [searchParams, dispatch])

    const hotels = useSelector((state) => state.hotels);

    const [filteredHotels, setFilteredHotels] = useState({data: []});

    const handleFilter = (selectedAmenities) => {

        if (!hotels?.hotels.data) return;
        if (selectedAmenities.length === 0) {
          setFilteredHotels([]);
          return;
        }
    
        const filtered = hotels.hotels.data.filter((hotel) =>
          selectedAmenities.every((amenity) =>
            hotel.amenities?.includes(amenity)
          )
        );
       
    
        setFilteredHotels(filtered);
   
      };
      console.log(filteredHotels, 'fffffffffff')
      const displayHotels = filteredHotels.length > 0 ? filteredHotels : hotels?.hotels || [];


    const city = searchParams.get("city") || ""

    // Handle cases where the data might not exist or is empty
    if (!hotels || hotels.length === 0) {
        return <p>No hotels found. Please try searching again.</p>;
    }
  return (
    <Gutter>
    <div className="flex space-x-24 my-6">
        <div className=' space-y-10'>
        <HotelMap hotels={hotels.hotels} />
        <HotelFilter onFilter={handleFilter}/>
        </div>

        <div className=' space-y-5'>
            <h1 className='text-2xl'>Available Hotels in: <span className='font-bold'>{city}</span></h1>
            <ul className="flex flex-col justify-center items-center">
                <ResultCard
                    hotels={ displayHotels }
                    checkIn={searchParams.get("checkIn")}
                    checkOut={searchParams.get("checkOut")} />

            </ul>
        </div>
    </div>
</Gutter>
  )
}
