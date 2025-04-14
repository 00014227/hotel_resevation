import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux'

export default function HotelDetailMessage() {
  const hotelDetail = useSelector((state) => state.aichat.hotelDetail)
  const selectedHotelId = useSelector((state) => state.aichat.selectedHotelId);
  console.log(selectedHotelId, 'iddddddd')
  const hotels = useSelector((state) => state.aichat.hotels)
  const hotel = hotels.find(hotel => hotel.id === selectedHotelId)
  console.log(hotel, 'ggggffffffffff')
  const images = hotel.image_url?.slice(0, 4) || [];

  console.log(hotels, 'gggggggggg')

  console.log(hotelDetail, 'detailllllll')
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-3xl">
      <h3 className="text-lg font-bold mb-2">{hotel.name}</h3>
      <div className="flex justify-between">
      {images.map((img, index) => (
        <Image
        width={300}
        height={300}
        key={index} src={img} alt={`Hotel Image ${index + 1}`} className="w-44 h-44 object-cover rounded-lg" />
      ))}
      </div>
      <p className="text-gray-700">{hotelDetail.description}</p>
    </div>)
}
