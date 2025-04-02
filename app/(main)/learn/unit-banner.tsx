"use client";
import { useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="fixed top-17.5 left-3 right-3 z-50 bg-[#009aef] p-5 text-white flex items-center justify-between border-b-4 border-[#1175c9] shadow-lg rounded-b-xl rounded-t-xl">
        <div className="space-y-2.5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg">{description}</p>
        </div>

        {/* Trigger image */}
        <img
          src="https://d16ho1g3lqitul.cloudfront.net/whyv2.svg"
          alt="Read Now"
          className="cursor-pointer h-20 w-20"
          onClick={handleImageClick}
        />
      </div>

      {/* Popup Modal */}
      {showPopup && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-white/20"
    onClick={closePopup}
  >
    <div
      className="relative bg-white w-[80%] sm:w-[400px] rounded-2xl shadow-xl p-5 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={closePopup}
        className="absolute top-2 left-4 text-gray-500 hover:text-black text-xl"
        aria-label="Close"
      >
        ✖
      </button>

      {/* Image inside modal */}
      <Image
        src="https://d16ho1g3lqitul.cloudfront.net/b1s1.png"
        alt="Read Book"
        width={220}
        height={220}
        className="mx-auto mb-4"
      />

      {/* Text inside modal */}
      <p className="text-center text-gray-700 text-m">
        Science shows that <span className="font-black">nature has a powerful impact on our brains</span> —it reduces stress, boosts creativity, sharpens focus, and strengthens our connections with others. Whether it’s a walk in the park or gazing at the sky, nature grounds us and enriches our thinking. Join Sochu and his friends in celebrating the <span className="font-black">joy of curiosity and discovery!</span>
      </p>
    </div>
  </div>
)}

    </>
  );
};
