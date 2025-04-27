"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { fetchActiveHotelRooms, fetchHotelById } from "@/app/lib/features/hotelDetails/hotelDetails.thunk";
import Gutter from "@/components/Gutter";
import SearchForm from "@/components/SearchForm";
import DetailPageImg from "@/components/DetailPageImg";
import { FaLocationDot } from "react-icons/fa6";
import { FaWifi, FaSwimmingPool, FaUtensils, FaDumbbell, FaParking, FaConciergeBell } from "react-icons/fa";
import HotelMap from "@/components/Map";
import RoomResults from "@/components/RoomResults";
import RoomSearch from "@/components/RoomResults/RoomSearch";
import MesssageToTheHotel from "./components/MessageToHotel";

const defaultAmenities = [
    { icon: <FaWifi />, label: "Free Wi-Fi" },
    { icon: <FaSwimmingPool />, label: "Swimming Pool" },
    { icon: <FaUtensils />, label: "Breakfast Included" },
    { icon: <FaDumbbell />, label: "Fitness Center" },
    { icon: <FaParking />, label: "Parking" },
    { icon: <FaConciergeBell />, label: "24/7 Reception" },
];

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
    }, [searchParams, dispatch, params.id]);

    const hotelDetail = useSelector((state) => state.hotelDetail.hotel)
    console.log(hotelDetail, 'deeeet')
    const rooms = useSelector((state) => state.hotelDetail.rooms)
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
                <div className="mt-4 flex flex-col lg:flex-row gap-6">
                    {/* Hotel Description */}
                    <div className="lg:w-2/3">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Description</h3>
                        <p className="text-gray-700">
                            {hotelDetail.data[0].description || "Enjoy a comfortable stay with premium services and modern facilities."}
                        </p>
                    </div>

        
                    
                    <HotelMap hotels={hotelDetail}/>
                                {/* Amenities */}
                    {/* <div className="lg:w-1/2">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Amenities</h3>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                            {(hotelDetail.data[0].amenities?.length ? hotelDetail.data[0].amenities.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <FaConciergeBell className="text-blue-500" />
                                    {item}
                                </li>
                            )) : defaultAmenities.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-blue-500">{item.icon}</span>
                                    {item.label}
                                </li>
                            )))}
                        </ul>
                    </div> */}
                </div>
                <RoomSearch/>
                <RoomResults rooms={rooms}/>
                <MesssageToTheHotel admin_id={hotelDetail.data[0].admin_id}/>
            </div>
        </Gutter>
    );
}
