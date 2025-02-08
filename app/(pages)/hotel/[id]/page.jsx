"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { fetchActiveHotelRooms, fetchHotelById } from "@/app/lib/features/hotelDetails/hotelDetails.thunk";

export default function HotelDetail() {
    const params = useParams();


    const searchParams = useSearchParams()

    const dispatch = useDispatch()

    useEffect(() => {
        const id = params.id
        const checkIn = searchParams.get('checkIn')
        const checkOut = searchParams.get('checkOut')
        dispatch(fetchHotelById(id))
        dispatch(fetchActiveHotelRooms({checkIn, checkOut, id}))
    }, [searchParams]);

    const hotelDetail = useSelector((state) => state.hotelDetail.hotel)
    const rooms = useSelector((state) => state.hotelDetail.rooms)
    console.log(rooms, 'detail')

    if (!hotelDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {/* <h1>{hotelDetails.name}</h1>
            <p>{hotelDetails.description}</p>
            <p>Price: ${hotelDetails.price}</p>
            <p>Rating: {hotelDetails.rating}</p> */}
        </div>
    );
}
