import React from 'react'
import { useSelector } from 'react-redux';
import FindHotelUI from './FindHotelUI';
import HotelDetailMessage from './HotelDetailMessage';

export default function AIChat({messages}) {
    const msgType = useSelector((state) => state.aichat.msgType);

    switch (msgType) {
        case "find-hotel":
            return <FindHotelUI messages={messages}/>
        case "hotel-detail":
            return <HotelDetailMessage/>
        default:
            return <FindHotelUI messages={messages}/>

    }
  
}
