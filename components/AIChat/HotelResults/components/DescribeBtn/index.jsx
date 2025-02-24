import { Button } from '@/components/ui/button'
import { useState } from "react";

export default function DescribeButton({hotel}) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    async function fetchHotelDescription(hotelName, descriptionType = "default") {
        setLoading(true)
        try {
            const response = await fetch("/api/hotel-description", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({hotelName, descriptionType })
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
    console.log(description, 'desc')

  return (
    <Button onClick={() => fetchHotelDescription(hotel.name)}> Describe This Hotel</Button>
  )
}
