"use client"

import {useState} from "react"
import DateRangeInp from "./DateRange"
import PlaceInp from "./PlaceInp"
import { Button } from "../ui/button"
import { supabase } from "@/app/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { searchHotels } from "@/app/lib/features/searchHotel/hotels.thunk"


export default function SearchForm() {
    const dispatch = useDispatch()
    const [searchHotel, setSearchHotel] = useState({
        country: '',
        city: '',
        checkIn: '',
        checkOut: '',
        includePets: false,
        totalGuests: 1
    })

    const search = () => {
        dispatch(searchHotels(searchParams))
    }

const searchParams = {
  country: 'USA',
  city: 'New York',
  checkIn: '2025-01-15',
  checkOut: '2025-01-20',
  includePets: true,
  totalGuests: 1 // Total number of guests (adults + children)
};

// searchHotels(searchParams).then(hotels => {
//   console.log('Available Hotels:', hotels);
// });

  return (
      <div className="flex justify-center">
         <PlaceInp/>
         <DateRangeInp/>
         <PlaceInp/>
         <Button className=" bg-red-500 hover:bg-red-700 w-1/12 py-6">Find</Button>
      </div>
  )
}
