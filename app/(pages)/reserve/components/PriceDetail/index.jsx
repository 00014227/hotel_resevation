"use client"

import React from 'react';

export default function PriceDetail({ pricePerNight = 200, nights = 1 }) {
  const taxRate = 0.1; // 10% tax
  const subtotal = pricePerNight * nights;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="w-full max-w-sm bg-white shadow-lg h-[15rem] rounded-2xl p-6 mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Price Details</h3>

      <div className="flex justify-between text-gray-700">
        <span>${pricePerNight} x {nights} night{nights > 1 ? 's' : ''}</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Taxes and Fees (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
