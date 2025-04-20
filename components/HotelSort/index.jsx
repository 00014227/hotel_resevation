import { useState } from 'react';

const SORT_OPTIONS = [
    { label: 'Price: Low to High', value: 'priceLow' },
    { label: 'Price: High to Low', value: 'priceHigh' },
    { label: 'Rating: High to Low', value: 'ratingHigh' },
];

export default function HotelSort({ onSort }) {
    const [selected, setSelected] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onSort(value);
    };
    return (
        <div className="w-full max-w-sm mb-4">
            <label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-700">
                Sort By
            </label>
            <select
                id="sort"
                value={selected}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                <option value="">Select...</option>
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>)
}
