import React from 'react'
import { useSelector } from 'react-redux';
import CompareHotels from './CompareHotels';
import FindHotelUI from './FindHotelUI';
import HotelDetailMessage from './HotelDetailMessage';

export default function AIChat({ messages }) {
    const msgType = useSelector((state) => state.aichat.msgType);
    const chatHistory = useSelector((state) => state.aichat.chatHistory);

    return (
        <div className='w-full'>
            {chatHistory.map((component, index) => (
                <div key={index}>
                    {component === "find-hotel" && <FindHotelUI messages={messages} />}
                    {component === "hotel-detail" && <HotelDetailMessage />}
                    {component === "compare" && <CompareHotels/>}
                </div>
            ))}
        </div>
    );

}
