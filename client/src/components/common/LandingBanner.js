import React, { memo } from "react";
import Button from "components/buttons/Button";
import "./LandingBanner.css"


const LandingBanner = () => {
    return (
        <div>
            <div className="w-full h-[1000px]">
                <div className="bg-banner hero-area align-middle items-center flex justify-center">
                    <div className="absolute z-10">
                        <p className="text-orange text-xl font-bold text-center mb-4">
                            FOOTBALL & BOOKING{" "}
                        </p>
                        <h1 className="text-6xl text-white text-center">
                            Best Booking Pitches Website
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-4">
                            <Button
                                size={20}
                            >
                                Pitches collection
                            </Button>
                            <Button
                                size={20}
                            >
                                Contact us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row h-full justify-center gap-20 px-8 bg-slate-200 py-20 ">
                <div className="flex gap-4 items-center">
                    <span className="">XXX</span>
                    <div className="flex flex-col text-sm text-gray-500">
                        <h3 className="font-bold text-xl">Refund</h3>
                        <span className="text-sm">Refund 24/24 ádadsa</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="">XXX</span>
                    <div className="flex flex-col text-sm text-gray-500">
                        <h3 className="font-bold text-xl">Contact</h3>
                        <span className="text-sm">Contact 24/7 ádadsa</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="">XXX</span>
                    <div className="flex flex-col text-sm text-gray-500">
                        <h3 className="font-bold text-xl">Refund</h3>
                        <span className="text-sm">Refund 24/24 ádadsa</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(LandingBanner);
