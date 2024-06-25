import { Pitch } from "components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetWishlist } from "apis";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);
  const [wishList, setwishList] = useState(null);
  const fetchWishList = async (id) => {
    const response = await apiGetWishlist(id);
    setwishList(response);
  };

  useEffect(() => {
    fetchWishList(current?._id);
  }, [wishList]);

  return (
    <div className="w-[80vw] relative px-6">
      <header className="ml-2 py-4 border-b-2 border-gray-300 text-2xl font-bold tracking-tight">
        Personal Wishlist
      </header>
      <div className="w-full grid grid-cols-4 gap-4 pt-2">
        {wishList?.rs?.wishlist?.map((el) => (
          <div key={el._id}>
            <Pitch pid={el._id} pitchData={el} normal={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
