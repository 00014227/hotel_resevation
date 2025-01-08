"use client"

import {useState} from "react"
import DateRangeInp from "./DateRange"
import PlaceInp from "./PlaceInp"
import { Button } from "../ui/button"


export default function SearchForm() {

  return (
      <div className="flex justify-center">
         <PlaceInp/>
         <DateRangeInp/>
         <PlaceInp/>
         <Button className=" bg-red-500 hover:bg-red-700 w-1/12 py-6">Find</Button>
      </div>
  )
}
