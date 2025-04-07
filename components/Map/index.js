import { useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const HotelMap = ({ hotels }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // 🧠 Calculate dynamic center based on hotel coordinates
  const center = useMemo(() => {
    if (!hotels?.data?.length) return { lat: 37.7749, lng: -122.4194 }; // fallback: San Francisco
    const total = hotels.data.reduce(
      (acc, hotel) => {
        acc.lat += parseFloat(hotel.location.lat);
        acc.lng += parseFloat(hotel.location.lng);
        return acc;
      },
      { lat: 0, lng: 0 }
    );
    const count = hotels.data.length;
    return {
      lat: total.lat / count,
      lng: total.lng / count,
    };
  }, [hotels]);

  // 💬 Custom marker with price bubble
  const createMarkerIcon = (price) => ({
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="50" viewBox="0 0 90 50">
        <path d="M10,10 Q0,10 0,20 L0,30 Q0,40 10,40 L40,40 L45,48 L50,40 L80,40 Q90,40 90,30 L90,20 Q90,10 80,10 Z" 
          fill="#007AFF" stroke="#ffffff" stroke-width="2"/>
        <text x="50%" y="55%" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle" alignment-baseline="middle">
          $${price}
        </text>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(90, 50),
    anchor: new window.google.maps.Point(45, 50),
  });

  if (loadError) return <div>Error loading maps</div>;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(true)} className="h-0">
        <div className="border border-gray-500 rounded-xl">
          <Image
            src="https://searchengineland.com/wp-content/seloads/2018/08/google-maps-world-smartsync-at-for-google-world-map.jpg"
            width={250}
            height={150}
            alt="Map"
            className="rounded-tl-xl rounded-tr-xl"
          />
          <p className="text-blue-400 py-2">View in a map</p>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-full h-[100vh] px-0">
        <DialogTitle>Explore on Map</DialogTitle>
        {isDialogOpen && isLoaded ? (
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
            {hotels?.data?.map((hotel, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(hotel.location.lat),
                  lng: parseFloat(hotel.location.lng),
                }}
                title={hotel.name}
                icon={createMarkerIcon(hotel.price)}
                onClick={() => setSelectedHotel(hotel)}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Loading Maps...</div>
        )}

        {/* Hotel Preview Card */}
        {selectedHotel && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[500px] bg-white shadow-lg rounded-xl p-4 flex items-center gap-4 transition-all">
            <Image 
              src={Array.isArray(selectedHotel.image_url) ? selectedHotel.image_url[0] : selectedHotel.image_url}
              width={200}
              height={200}
              alt={selectedHotel.name}
              className="rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">{selectedHotel.name}</h3>
              <p className="text-blue-500 font-bold">${selectedHotel.price} / night</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HotelMap;
