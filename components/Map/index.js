import React from 'react';
import { GoogleMap, Marker , useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};



const HotelMap = ({ hotels }) => {
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Add your API key here
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
    >
      {hotels?.data?.map((hotel, index) => (
        <Marker 
          key={index}
          position={{
             lat: parseFloat(hotel.location.lat),
             lng: parseFloat(hotel.location.lng)
             }}
          title={hotel.name}
            advancedMarkerElement={{
            content: document.createElement('div'), // Customize this as needed
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default HotelMap;