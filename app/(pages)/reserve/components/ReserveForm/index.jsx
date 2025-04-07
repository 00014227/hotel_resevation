import React, { useState } from 'react';

export default function ReserveForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send this data to Supabase or an API
    console.log('Reservation submitted:', formData);
    alert('Reservation submitted!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow-lg p-8 rounded-2xl mx-auto max-w-2xl mt-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reservation Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Surname</label>
          <input
            required
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          required
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          required
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            required
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            required
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
      >
        Confirm Reservation
      </button>
    </form>
  );
}
