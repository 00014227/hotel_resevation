import React from 'react'
import { useSelector } from 'react-redux';

export default function CompareHotels() {
    const { selectedHotels, isLoading, comparisonResult } = useSelector((state) => state.aichat);

    return (
        <div>
            {comparisonResult && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-lg">AI Comparison:</h3>
                    <p className="text-gray-700">{comparisonResult}</p>
                </div>
            )}
        </div>
    )
}
