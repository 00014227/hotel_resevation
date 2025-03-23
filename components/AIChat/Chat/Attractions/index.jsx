import React from "react";
import { useSelector } from "react-redux";

export default function NearByAttractions() {
  const { nearbyAttractions } = useSelector((state) => state.aichat);

  if (!nearbyAttractions) return null; // Don't render if there's no data

  console.log("Nearby Attractions Data:", nearbyAttractions); // Debugging

  // Ensure we are accessing the correct content
  const attractionsText =
    typeof nearbyAttractions === "object" && nearbyAttractions.attractions
      ? nearbyAttractions.attractions
      : "";

  if (!attractionsText || typeof attractionsText !== "string") {
    return <div className="text-red-500">Failed to load attractions.</div>;
  }

  // Extract attractions using regex
  const attractions = attractionsText
    .split("\n\n") // Split paragraphs
    .filter((item) => item.trim() !== "") // Remove empty items
    .map((item) => {
      const match = item.match(/^\d+\.\s\*\*(.*?)\*\*:\s(.*)$/); // Extract name & description
      return match ? { name: match[1], description: match[2] } : null;
    })
    .filter(Boolean); // Remove null values

  return (
    <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-bold text-xl mb-4 text-blue-700">Nearby Attractions</h3>
      
      <ul className="space-y-4">
        {attractions.map((attraction, index) => (
          <li key={index} className="border p-4 rounded-lg bg-white shadow-sm">
            <h4 className="font-semibold text-lg text-gray-900">{attraction.name}</h4>
            <p className="text-gray-700">{attraction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
