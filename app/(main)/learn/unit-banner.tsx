"use client";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
    const openReaderApp = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent the default Link navigation
        window.open("http://192.168.1.71:4000/reader", "_self"); // Redirect to localhost:4000 when clicked
    };

    return (
        <div className="w-full rounded-xl bg-[#009aef] p-5 text-white flex items-center justify-between border-b-4 border-[#1175c9]">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-lg">{description}</p>
            </div>
            
            {/* Image with redirect behavior */}
            <img
                src="/padhle.svg"  // Icon for the link
                alt="Read Now"
                className="cursor-pointer h-20 w-20"
                onClick={openReaderApp} // Redirect on click
            />
        </div>
    );
};
