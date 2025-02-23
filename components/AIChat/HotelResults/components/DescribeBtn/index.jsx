import { Button } from '@/components/ui/button'
import { useState } from "react";

export default function DescribeButton({hotel}) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    console.log(description, 'desc')
    async function fetchHotelDescription(hotelId, hotelName) {
        setLoading(true)
        try {
            const response = await fetch("/api/hotel-description", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({hotelId, hotelName})
            })
            const data = await response.json();
            setDescription(data.description);
        } catch (error) {
            console.error("Error fetching hotel description:", error);
            setDescription("Failed to generate a description.");
        } finally {
            setLoading(false);

        }
    }
  return (
    <Button onClick={() => fetchHotelDescription(hotel.id, hotel.name)}> Describe This Hotel</Button>
  )
}
