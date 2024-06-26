import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "components";
import Chatbox from "components/common/Chatbox";


const Public = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fakeDataFetch();
  }, []);

  return (
    <div className="max-h-screen flex flex-col items-center ">
      <Chatbox></Chatbox>
      <TopHeader></TopHeader>
      {/* <Header></Header> */}
      {/* <Navigation></Navigation> */}
      <div className="w-full  items-center flex-col">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Public;
