"use client"

import { useState } from "react"
import DateRangeInp from "./DateRange"
import PlaceInp from "./PlaceInp"
import { Button } from "../ui/button"
import { supabase } from "@/app/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { searchHotels } from "@/app/lib/features/searchHotel/hotels.thunk"
import Place from "./Place"
import { useRouter } from "next/navigation"


export default function SearchForm() {
  const dispatch = useDispatch()
  const router = useRouter()
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

  const searchParams = {
    country: '',
    city: '',
    checkIn: '2025-01-15',
    checkOut: '2025-01-20',
    includePets: true,
    totalGuests: 1 // Total number of guests (adults + children)
  };

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
   
    // dispatch(searchHotels(searchHotel))
    router.push(`/result?${searchParams.toString()}`)
  }

  console.log(searchParams, 'searchParams')

  console.log(searchHotel, 'hhhh')


  return (
    <div className="flex justify-center">
      <Place onChange={handleLocationChange}/>
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
