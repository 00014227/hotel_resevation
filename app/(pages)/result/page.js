'use client';
import Gutter from '@/components/Gutter';
import Image from 'next/image';
import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import ResultCard from '@/components/Card/ResultCard';
import { useSearchParams } from 'next/navigation';
import { searchHotels } from '@/app/lib/features/searchHotel/hotels.thunk';
import HotelMap from '@/components/Map';
import ResutUI from './component';


export default function ResultPage() {
    

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ResutUI/>
      </Suspense>
    );
}
