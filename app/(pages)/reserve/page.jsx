"use client"

import Gutter from '@/components/Gutter'
import React from 'react'
import ReserveForm from './components/ReserveForm'
import HotelDetail from './components/HotelDetails'
import PriceDetail from './components/PriceDetail'

export default function Reserve() {
  return (
    <Gutter>
      <div className='flex justify-between'>
        <ReserveForm/>
        <HotelDetail/>
        <PriceDetail/>
        </div>
    </Gutter>
  )
}
