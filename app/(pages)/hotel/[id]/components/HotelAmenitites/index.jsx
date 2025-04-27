import React from 'react';
import { CheckCircle2 } from 'lucide-react'; // You can change icon if you want!

export default function HotelAmenities({ amenities }) {
    console.log(amenities, 'ggggg')
  if (!amenities || amenities?.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
