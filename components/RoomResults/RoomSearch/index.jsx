import DateRangeInp from '@/components/SearchForm/DateRange'
import PlaceInp from '@/components/SearchForm/PlaceInp'
import { Button } from '@/components/ui/button';
import { useState } from "react"

export default function RoomSearch() {
    const [childrenCount, setChildrenCount] = useState(0);
      const [adultCount, setAdultCount] = useState(1)
      const [searchHotel, setSearchHotel] = useState({
        country: '',
        city: '',
        checkIn: '',
        checkOut: '',
        includePets: false,
        totalGuests: 1
      })
    
      const handleLocationChange = (e) => {
        const value = e.target.value;
        setSearchHotel((prev) => ({
            ...prev,
            city: value, // Update the city field or modify as needed
        }));
    };
    
      const handleTotalGuestsChange = () => {
        setSearchHotel((prev) => ({
          ...prev,
          totalGuests: adultCount + childrenCount,
        }));
      };
    
      const handleIncludePetsChange = (checked) => {
        setSearchHotel((prev) => ({
          ...prev,
          includePets: checked,
        }));
      };
    
      const handleDateChange = (dateRange) => {
        setSearchHotel((prev) => ({
          ...prev,
          checkIn: dateRange.from ? dateRange.from.toISOString().split('T')[0] : '',
          checkOut: dateRange.to ? dateRange.to.toISOString().split('T')[0] : '',
        }));
      };

      const handleSubmit = () => {
        handleTotalGuestsChange()
    
        const searchParams = new URLSearchParams({
          country: searchHotel.country,
          city: searchHotel.city,
          checkIn: searchHotel.checkIn,
          checkOut: searchHotel.checkOut,
          includePets: searchHotel.includePets,
          totalGuests: searchHotel.totalGuests,
        });
       

      }
    
    
  return (
    <div className="flex justify-center space-x-4"      >
      <DateRangeInp
        selectedRange={{
          from: searchHotel.checkIn ? new Date(searchHotel.checkIn) : undefined,
          to: searchHotel.checkOut ? new Date(searchHotel.checkOut) : undefined,
        }}
        onDateChange={handleDateChange}
      />
      <PlaceInp
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
        adultCount={adultCount}
        setAdultCount={setAdultCount}
        includePets={searchHotel.includePets}
        setIncludePets={handleIncludePetsChange}
      />
      <Button onClick={handleSubmit} className=" bg-red-500 hover:bg-red-700 w-1/12 py-6">Find</Button>
    </div>
  )
}
