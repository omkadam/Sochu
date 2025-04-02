"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SetPage() {
  return (
    <div className="flex flex-col">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center py-10 px-4">
        <div className="text-4xl font-bold">
            <Image src={"/series1.jpeg"} alt="Sochu icon" width={120} height={120}/>
        </div>
        <p className="mt-4 text-xl">
          Woohoo!
          <br />
          Let’s begin this journey together!
        </p>
        <div className="mt-4 flex justify-center">
          <Image src="/Sochu-Smile.png" alt="Sochu Character" width={120} height={120} />
        </div>
      </div>

      {/* Plans Section */}
      <div className="bg-white px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Compare Plans</h2>

        {/* Recommended Plan */}
        <div className="border rounded-xl p-6 mb-6 shadow-md">
          <div className="text-sm font-semibold text-white bg-gradient-to-r from-purple-400 to-green-400 inline-block px-3 py-1 rounded-full mb-3">
            RECOMMENDED
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Sochu Thinking Series</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>12 Books with activities</li>
                <li>Multiple Languages</li>
                <li>No Ads</li>
                <li>One Year Subscription</li>
              </ul>
              {/* <div className="mt-4 text-blue-600 font-bold text-lg border-2 border-b-4 rounded-2xl pl-3">
                Buy Now: Rs. 1200/-
              </div> */}   
              <div className="mt-6 sm:mt-0">
                <Image src="/series1.jpeg" alt="Sochu Box" width={200} height={200} />
              </div>           
              <Button className="mt-3.5 ml-5" variant={"metallic-blue"} size={"default"}>Buy Now ₹1200/-</Button>             
              {/* <p className="text-sm text-gray-500">(One Year Subscription)</p> */}
            </div>
            
          </div>
        </div>

        <div className="border rounded-xl p-6 mb-10 shadow-md">
          <div className="text-sm font-semibold text-white bg-gradient-to-r from-purple-400 to-green-400 inline-block px-3 py-1 rounded-full mb-3">
            RECOMMENDED
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Sochu Thinking Series</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>12 Books with activities</li>
                <li>Multiple Languages</li>
                <li>With Ads</li>
                <li>One Year Subscription</li>
              </ul>
              {/* <div className="mt-4 text-blue-600 font-bold text-lg border-2 border-b-4 rounded-2xl pl-3">
                Buy Now: Rs. 1200/-
              </div> */}   
              <div className="mt-6 sm:mt-0">
                <Image src="/series1.jpeg" alt="Sochu Box" width={200} height={200} />
              </div>           
              <Button className="mt-3.5 ml-5" variant={"metallic-blue"} size={"default"}>Buy Now ₹600/-</Button>             
              {/* <p className="text-sm text-gray-500">(One Year Subscription)</p> */}
            </div>
            
          </div>
        </div>

        {/* Basic Plan */}
        {/* <div className="border rounded-xl p-6 shadow-md mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Sochu Thinking Series</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>12 Books with activities</li>
                <li>Multiple Languages</li>
                <li>With Ads</li>
              </ul>
              <div className="mt-4 text-blue-600 font-bold text-lg">
                Buy Now: Rs. 600/-
              </div>
              <p className="text-sm text-gray-500">(One Year Subscription)</p>
            </div>
            <div className="mt-6 sm:mt-0">
              <Image src="/series1.jpeg" alt="Sochu Box" width={100} height={100} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
