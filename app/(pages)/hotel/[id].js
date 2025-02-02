import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function HotelDetail() {
    const router = useRouter();
    const { id } = router.query; // Get hotel ID from URL

    // Get all hotels from Redux store
    const allHotels = useSelector((state) => state.hotels?.hotels?.data || []);
    
    // Find the selected hotel from Redux
    const hotel = allHotels.find(h => h.id === id);

    const [hotelDetails, setHotelDetails] = useState(hotel || null);

    return (
             <div>
            <h1>{hotelDetails.name}</h1>
            <p>{hotelDetails.description}</p>
            <p>Price: ${hotelDetails.price}</p>
            <p>Rating: {hotelDetails.rating}</p>
        </div>
    )
}