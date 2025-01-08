"use client"
import Card from "@/components/Card";
import Gutter from "@/components/Gutter";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";

const destinations = [
  { name: "Dubai", image: "/top/dubai.png" },
  { name: "Bali", image: "/top/bali.png" },
  { name: "London", image: "/top/london.png" },
  { name: "Japan", image: "/top/japan.png" },
  { name: "Paris", image: "/top/paris.png" },
  { name: "Rome", image: "/top/rome.png" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Gutter>
        <SearchForm />
        <section class="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50">
          <div class="flex-1">
            <img
              src="./home.png"
              alt="Hotel Room"
              class="rounded-lg shadow-md w-full object-cover"
            />
          </div>

          <div class="flex-1 space-y-4">
            <span
              class="inline-block bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full"
            >
              Dream Holidays
            </span>
            <h2 class="text-3xl font-bold text-gray-800">
              Enjoy unforgettable experiences in hotels
            </h2>
            <p class="text-gray-600">
              We are passionate about making your travel planning stress-free. With a
              focus on innovation, our app combines cutting-edge technology with a deep
              understanding of what travelers need.
            </p>
            <button
              class="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Explore Now
            </button>
          </div>
        </section>

        {/* Suggest */}

        <section class="py-12 bg-gray-50">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800">Top-Rated Stays for You</h2>
            <div class="w-16 h-1 bg-gray-800 mx-auto mt-2"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <Card />
            <Card />
            <Card />
            <Card />


          </div>
        </section>

        {/* top */}
        <section className="py-12 bg-gray-50">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Top Destination</h2>
            <div className="w-16 h-1 bg-gray-800 mx-auto mt-2"></div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="relative bg-white shadow-md rounded-lg overflow-hidden group"
              >
                {/* Image */}
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Gutter>
    </>
  );
}
