"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { fetchActiveHotelRooms, fetchHotelById } from "@/app/lib/features/hotelDetails/hotelDetails.thunk";
import Gutter from "@/components/Gutter";
import SearchForm from "@/components/SearchForm";
import DetailPageImg from "@/components/DetailPageImg";
import { FaLocationDot } from "react-icons/fa6";


export default function HotelDetail() {
    const params = useParams();


    const searchParams = useSearchParams()

    const dispatch = useDispatch()

    useEffect(() => {
        const id = params.id
        const checkIn = searchParams.get('checkIn')
        const checkOut = searchParams.get('checkOut')
        dispatch(fetchHotelById(id))
        dispatch(fetchActiveHotelRooms({ checkIn, checkOut, id }))
    }, [searchParams]);

    const hotelDetail = useSelector((state) => state.hotelDetail.hotel)
    const rooms = useSelector((state) => state.hotelDetail.rooms)
    console.log(hotelDetail)
    if (!hotelDetail) {
        return <p>Loading...</p>;
    }

    return (
        <Gutter>
            <div className=" py-7 space-y-4">
                <SearchForm />
                <div>
                    <h1 className=" text-3xl font-semibold text-gray-800">{hotelDetail.data[0].name}</h1>
                    <div className="flex items-end space-y-3 font-semibold gap-3">
                        <FaLocationDot size={25} className="text-red-500" />
                        <span>{hotelDetail.data[0].address.full}</span>
                    </div>
                </div>
                <DetailPageImg hotelDetail={hotelDetail} />
            </div>
        </Gutter>
    );
}
