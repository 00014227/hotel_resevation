import React from 'react'

export default function HotelDetailMessage({msg}) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-bold mb-2">{msg.hotel.name}</h3>
      <img src={msg.hotel.image} alt={msg.hotel.name} className="w-full rounded-lg mb-2" />
      <p className="text-gray-700">{msg.hotel.description}</p>
    </div>  )
}
