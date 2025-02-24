import Link from 'next/link'
import React from 'react'
import DescribeButton from './components/DescribeBtn'

export default function HotelResults({ hotels }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 overflow-y-auto">
            {hotels.map((hotel) => (
                <div key={hotel.id} className="border p-4 rounded-lg">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-32 object-cover rounded-lg" />
                    <h3 className="font-semibold mt-2">{hotel.name}</h3>
                    <p className="text-sm text-gray-500">{hotel.location}</p>
                    <p className="font-bold">{hotel.price}</p>
                    <DescribeButton hotel={hotel} />
                </div>
            ))}
        </div>)
}
