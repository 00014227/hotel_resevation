import React from "react";
import { useSelector } from "react-redux";

export default function CompareHotels() {
  const { comparisonResult } = useSelector((state) => state.aichat);

  if (!comparisonResult) return null;

  // Parse the JSON response if it's a string
  const comparisonText =
    typeof comparisonResult === "string"
      ? JSON.parse(comparisonResult).comparison
      : comparisonResult.comparison;

  // Split the text into sections using `###` as a divider
  const sections = comparisonText.split("###").filter((section) => section.trim() !== "");

  return (
    <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-bold text-xl mb-4">AI Hotel Comparison</h3>

      {sections.map((section, index) => {
        // Extract the heading and content
        const [title, ...content] = section.split("\n").filter((line) => line.trim() !== "");

        return (
          <div key={index} className="mb-4">
            {title && <h4 className="font-semibold text-lg text-blue-700">{title}</h4>}
            <p
              className="text-gray-800 mt-1"
              dangerouslySetInnerHTML={{
                __html: content.join(" ").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
