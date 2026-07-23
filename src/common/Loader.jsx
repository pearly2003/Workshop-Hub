import React, { useEffect, useState } from "react";
import CarLoader from "../assets/loader/loading.webm";

const Loader = () => {
  const messages = [
    "Please wait, your data is fetching...",
    "Almost done...",
    "Hang tight, preparing your data...",
    "Just a moment, almost ready...",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Change message every 3 seconds
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(interval);
    };
  }, []);

  return (
    //    <div className="absolute inset-0 flex flex-col items-center justify-center h-screen bg-white/50 z-50">
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 z-[9999]">
      {/* <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-2"></div> */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-20 h-20 md:w-28 md:h-28 rounded-full  mb-2 shadow-lg"
      >
        <source src={CarLoader} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <>
        <p className="text-gray-700 font-medium text-sm animate-pulse">
          Loading ...
        </p>
      </>
    </div>
  );
};

export default Loader;
