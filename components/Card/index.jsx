import React from 'react'

export default function Card() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img
      src="/home.png"
      alt="Hotel Inspira"
      className="w-full h-72 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Hotel Inspira - S
      </h3>
      <p className="text-sm text-gray-600">Tashkent, Uzbekistan</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-gray-800 font-bold">$300 - night</div>
        <div className="flex items-center text-gray-600">
          <span className="mr-1">★</span> 9.0
        </div>
      </div>
    </div>
    </div>
  )
}