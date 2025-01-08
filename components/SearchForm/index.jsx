"use client"

import {useState} from "react"
import DateRangeInp from "./DateRange"
import PlaceInp from "./PlaceInp"


export default function SearchForm() {

  return (
      <div className="flex">
         <DateRangeInp/>
         <PlaceInp/>
      </div>
  )
}
