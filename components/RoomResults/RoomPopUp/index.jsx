import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react'

export default function RoomPopUp({ room, numberOfNights, hotelId }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter()

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === room.room_images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? room.room_images.length - 1 : prevIndex - 1
        );
    };

    const handleReserve = (roomName, roomPrice) => {
        const checkIn = searchParams.get("checkIn");
        const checkOut = searchParams.get("checkOut");
    
        const queryString = new URLSearchParams({
            checkIn,
            checkOut,
            numberOfNights: numberOfNights.toString(),
            hotelId: hotelId,
            roomId: room.room_id, // optionally pass room id
            room_name: roomName,
            room_price: roomPrice
        }).toString();
    
        router.push(`/reserve?${queryString}`);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <h3 className="text-red-500 font-semibold cursor-pointer">{room.room_name}</h3>
            </DialogTrigger>
            <DialogContent className="flex max-w-[55vw] p-5 rounded-2xl">
                <div className='w-full max-w-2xl '>
                    {/* Main Image with Navigation */}
                    <div className='relative'>
                        <Image
                            src={room.room_images[currentIndex]}
                            width={650}
                            height={500}
                            alt={room.room_name}
                            className='rounded-2xl object-cover'
                        />
                        <button
                            onClick={handlePrev}
                            className='absolute top-1/2 left-2 bg-white shadow px-2 py-1 rounded-full text-black'
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            className='absolute top-1/2 right-2 bg-white shadow px-2 py-1 rounded-full text-black'
                        >
                            →
                        </button>
                    </div>

                    {/* Thumbnails */}
                    <div className='flex mt-4 '>
                        {room.room_images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                width={70}
                                height={70}
                                alt={`Thumbnail ${index}`}
                                className={`rounded-xl cursor-pointer border-2 ${index === currentIndex ? 'border-black' : 'border-transparent'
                                    }`}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className='w-full max-w-sm space-y-4 flex flex-col justify-between'>
                    {/* Room Name */}
                    <h2 className='text-2xl font-semibold'>{room.room_name}</h2>

                    {/* Amenity Sections */}
                    <div className='space-y-4'>
                        {Object.entries(room.amenities_by_category).map(([category, amenities]) => (
                            <div key={category}>
                                <h3 className='text-lg font-medium mb-1'>{category} Amenities</h3>
                                <ul className='list-disc list-inside text-sm text-gray-700'>
                                    {amenities.map((amenity, idx) => (
                                        <li key={idx}>{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Reserve Button */}
                    <button   onClick={handleReserve(room.room_name, room.price)} className='mt-6 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition'>
                        Reserve Now
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
