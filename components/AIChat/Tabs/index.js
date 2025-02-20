import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useCallback, useEffect } from 'react'
import { MessageCircle, MapPin, Calendar, Tag, Search } from "lucide-react";
import { useAIFindHotel } from '@/app/hooks/aiChatBot/useAIFindHotel';



const features = [
    { label: "Find Hotels", icon: <Search size={18} /> },
    { label: "Multi-City Search", icon: <MapPin size={18} /> },
    { label: "Dynamic Pricing", icon: <Tag size={18} /> },
    { label: "Nearby Attractions", icon: <Calendar size={18} /> },
];

export default function AITabs( {action} ) {



    
    return (
        <Tabs defaultValue={features[1].label} className="w-full">
            <TabsList className="flex gap-2 flex-wrap">
                
                <TabsTrigger value="Multi-City Search">
                    <MapPin size={18} /> Multi-City Search
                </TabsTrigger>
                <TabsTrigger onClick={action} value="Find Hotels">
                    <Search size={18} /> Find Hotels
                </TabsTrigger>
                <TabsTrigger value="Dynamic Pricing">
                    <Tag size={18} /> Dynamic Pricing
                </TabsTrigger>
                <TabsTrigger value="Nearby Attractions">
                    <Calendar size={18} /> Nearby Attractions
                </TabsTrigger>
            </TabsList>
            {features.map((feature) => (
                <TabsContent key={feature.label} value={feature.label}>
                    <p className="text-gray-600">{`You selected: ${feature.label}`}</p>
                </TabsContent>
            ))}
        </Tabs>
    )
}
