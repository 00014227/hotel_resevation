import React from 'react';
import Gutter from '../Gutter';

const Hero = () => {
    return (
        <div className=' h-[40vh] bg-cover bg-center flex items-center justify-center' style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/040/174/060/non_2x/ai-generated-relaxing-on-wood-bridge-in-beautiful-destination-island-phang-nga-bay-blue-sky-adventure-lifestyle-travel-thailand-tourism-nature-landscape-asia-tourist-on-summer-holiday-free-photo.jpg')" }}>
  
                <div className='flex flex-col justify-center items-center space-y-5'>
                    <h2 className='text-white text-5xl text-center'>Find Your Perfect Stay<br/> Anywhere, Anytime</h2>
                    <p className='text-white text-2xl'>Exclusive deals, tailored recommendations, and seamless booking.</p>
                    <button className="bg-red-500 text-white px-8 py-2 rounded-3xl hover:bg-red-800">
                            Explore Now
                        </button>
                </div>
       
        </div>
    );
};

export default Hero;