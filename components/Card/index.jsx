import React from 'react'

export default function Card() {
  return (
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img
      src="/home.png"
      alt="Hotel Inspira"
      class="w-full h-72 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800">
        Hotel Inspira - S
      </h3>
      <p class="text-sm text-gray-600">Tashkent, Uzbekistan</p>
      <div class="flex items-center justify-between mt-2">
        <div class="text-gray-800 font-bold">$300 - night</div>
        <div class="flex items-center text-gray-600">
          <span class="mr-1">★</span> 9.0
        </div>
      </div>
    </div>
    </div>
  )
}