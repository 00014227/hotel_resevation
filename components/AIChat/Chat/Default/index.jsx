import React from 'react';

export default function DefaultChatMessage() {
  return (
    <div className="text-center text-gray-700 p-6 space-y-4">
      <div className="text-2xl font-semibold">👋 Hello! I'm your AI travel assistant.</div>
      <div className="text-gray-500">
        Here’s what I can help you with:
      </div>
      <ul className="text-gray-600 text-left max-w-md mx-auto list-disc list-inside space-y-2">
        <li>🔍 <strong>Find hotels</strong> based on your preferences</li>
        <li>🏨 <strong>Provide detailed information</strong> about hotels</li>
        <li>⚖️ <strong>Compare hotels</strong> to find the best option</li>
        <li>📍 <strong>Discover nearby attractions</strong> around your hotel</li>
      </ul>
      <div className="text-gray-500">
        Just tell me what you need!
      </div>
    </div>
  );
}
