import { useState,useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CiUser } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function PlaceInp({childrenCount, setChildrenCount, adultCount, setAdultCount, includePets, setIncludePets}) {


    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className=" w-[20vw] py-6" variant="outline">
                        <CiUser className=" w-12" />
                         <span>{adultCount} adults - {childrenCount} children</span>
                         <RiArrowDropDownLine />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the dimensions for the layer.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <label>Adults</label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="border border-gray-400 text-gray-400 px-[10px] text-xl rounded-3xl"
                                        onClick={() => setAdultCount(adultCount - 1)}
                                    // disabled={count === 0}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={adultCount}
                                        onChange={(e) => setAdultCount(e.target.value)}
                                        className=" w-6 text-center  rounded"
                                    />
                                    <button
                                        className="border border-gray-400 text-gray-400 px-2  text-xl rounded-3xl"
                                        onClick={() => setAdultCount(adultCount + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>

                            <div className="grid grid-cols-3 items-center gap-4">
                                <label>Children</label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="border border-gray-400 text-gray-400 px-[10px] text-xl rounded-3xl"
                                        onClick={() => setChildrenCount(childrenCount - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={childrenCount}
                                        readOnly
                                        className=" w-6 text-center  rounded"
                                    />
                                    <button
                                        className="border border-gray-400 text-gray-400 px-2  text-xl rounded-3xl"
                                        onClick={() => setChildrenCount(childrenCount + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>


                            <div className="flex items-center gap-4">
                                <label>Are you travel with pets?</label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch 
                                        id="airplane-mode"
                                        checked = {includePets}
                                        onCheckedChange={setIncludePets}
                                        />

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default PlaceInp;