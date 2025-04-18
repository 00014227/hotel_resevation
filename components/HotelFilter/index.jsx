import {useState} from 'react'

const AMENITIES = [
  'Free Wi-Fi',
  'Parking',
  'Swimming Pool',
  'Air Conditioning',
  'Gym',
  'Spa',
  'Restaurant',
  'Bar',
  'Pet Friendly',
  'Room Service',
  '24-Hour Front Desk',
  'Laundry Service',
  'Airport Shuttle',
  'Non-Smoking Rooms',
  'Family Rooms',
  'Kitchenette',
  'TV',
  'Coffee Maker',
  'Hair Dryer',
  'Balcony',
];


export default function HotelFilter({onFilter }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    const updated = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(updated);
    onFilter(updated); // Pass selected filters to parent
  };
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Filter by Amenities</h2>
      <div className="flex flex-col gap-3">
        {AMENITIES.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);
          return (
            <label
              key={amenity}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : 'border-gray-300 hover:border-red-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleAmenity(amenity)}
                className="accent-red-500"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          );
        })}
      </div>
    </div>
  )
}
