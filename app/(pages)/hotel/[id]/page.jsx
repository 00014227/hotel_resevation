"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { fetchActiveHotelRooms, fetchHotelById } from "@/app/lib/features/hotelDetails/hotelDetails.thunk";

export default function HotelDetail() {
    const params = useParams();
    const id = params.id

    const searchParams = useSearchParams()
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const dispatch = useDispatch()
    const [hotelDetails, setHotelDetails] = useState(null);

    useEffect(() => {
       dispatch(fetchHotelById(id))
       dispatch(fetchActiveHotelRooms(checkIn, checkOut, id))
    }, []);

    if (!hotelDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{hotelDetails.name}</h1>
            <p>{hotelDetails.description}</p>
            <p>Price: ${hotelDetails.price}</p>
            <p>Rating: {hotelDetails.rating}</p>
        </div>
    );
}
