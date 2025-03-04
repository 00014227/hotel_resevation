import { addChatComponent, setMsgType, setSelectedHotelId } from '@/app/lib/features/AIChat/aichat.slice';
import { fetchHotelDescription } from '@/app/lib/features/AIChat/aiChat.thunk';
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';

export default function DescribeButton({hotel, hotelId}) {
    const dispatch = useDispatch()
    const msgType = useSelector((state) => state.aichat.msgType);
    
    function call() {
        dispatch(addChatComponent("hotel-detail"))
        dispatch(setSelectedHotelId(hotelId))
        dispatch(fetchHotelDescription(hotel.name, hotel.image_url))
        dispatch(setMsgType("hotel-detail"))
    }

  return (
    <Button onClick={call}> Describe This Hotel</Button>
  )
}
