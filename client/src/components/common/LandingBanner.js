import React, { memo } from "react";
import Button from "components/buttons/Button";
import "./LandingBanner.css"
import icons from "../../ultils/icons";

const { BsReplyFill, BsShieldShaded, FaTty, AiFillGift } = icons;

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
            <div className="flex flex-col md:flex-row h-full justify-center gap-20 px-8 bg-slate-200 py-20 dark:bg-medium ">
                <div className="flex gap-4 items-center">
                    <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white"><BsReplyFill size={25}></BsReplyFill></span>
                    <div className="flex flex-col text-sm text-gray-500 dark:text-white">
                        <h3 className="font-bold text-xl">Refund</h3>
                        <span className="text-sm">Get refund within 3 days</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white"><FaTty size={25}></FaTty></span>
                    <div className="flex flex-col text-sm text-gray-500  dark:text-white">
                        <h3 className="font-bold text-xl">24/7 Support</h3>
                        <span className="text-sm">Get support all day</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white"><AiFillGift size={25}></AiFillGift></span>
                    <div className="flex flex-col text-sm text-gray-500  dark:text-white">
                        <h3 className="font-bold text-xl">Special Deal</h3>
                        <span className="text-sm">Deals & Coupon every days</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(LandingBanner);
