import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

export default function DetailPageImg({ hotelDetail }) {
    const hotel = hotelDetail?.data?.[0] || {};
    const images = hotel?.image_url || [];
    return (
        <Dialog>
            <div className="grid grid-cols-2 gap-2  md:grid-cols-4">
                {/* Large Main Image */}

                {images.length > 0 && (

                    <div className="col-span-2 md:col-span-2 lg:col-span-2">
                        <DialogTrigger className='rounded-lg w-full h-full object-cover'>
                            <Image
                                src={images[0]} // Replace with actual image path
                                alt="Main Resort View"
                                width={500}
                                height={300}
                                className="rounded-lg w-full h-full object-cover" />
                        </DialogTrigger>
                    </div>

                )}
                {/* Smaller Side Images */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2 col-span-2">
                    {images.slice(1, 5).map((img, index) => (

                        <div key={index} className='relative'>
                            <DialogTrigger className='rounded-lg w-full h-full object-cover'>
                                <Image
                                    src={img}
                                    alt={`Hotel image ${index + 1}`}
                                    width={300}
                                    height={200}
                                    className="rounded-lg w-full h-full object-cover"
                                />
                            </DialogTrigger>

                            {index === 3 && images.length > 5 && (
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-lg">
                                    {images.length - 4}+
                                </div>
                            )}
                        </div>
                    ))}



                </div>
            </div>
            <DialogContent className=' max-w-2xl  max-h-[80vh] overflow-y-auto'>
                <DialogTitle>Images</DialogTitle>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Hotel image ${index + 1}`}
                        width={400}
                        height={300}
                        className="rounded-lg w-full h-full object-cover"
                    />
                ))}
            </DialogContent>
        </Dialog >
    )
}
