"use client"

import { Typography } from "@material-tailwind/react";
import React from "react";
import { Lora } from "next/font/google";
import { GiCardExchange } from "react-icons/gi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FaMagnifyingGlassChart } from "react-icons/fa6";

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const Benefits = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 px-5 md:px-10">
      <div>
        <div className={lora.className}>
          <Typography className="mb-2 text-2xl md:text-3xl lg:text-4xl text-center font-bold">
            Benefits for Users
          </Typography>
        </div>

        <Typography className="mb-5 opacity-80 text-xl font-light text-center">
          Unlock a World of Bookish Bliss with Boi Binimoy
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-10 md:p-20 rounded-xl shadow-xl">
          <div className="mb-2">
            <GiCardExchange className="w-12 h-12" />
          </div>
          <div>
            <h6 className="text-3xl mb-1">Exchange Magic</h6>
            <ul>
              <li>1. Give books new homes</li>
              <li>2. Discover hidden gems</li>
              <li>3. Build connections</li>
            </ul>
          </div>
        </div>

        <div className="p-10 md:p-20 rounded-xl  shadow-xl">
          <div className="mb-2">
            <RiShoppingBag3Fill className="w-12 h-12" />
          </div>
          <div>
            <h6 className="text-3xl mb-1">Shopping Spree</h6>
            <ul>
              <li>1. Unbeatable prices</li>
              <li>2. Extensive collection</li>
              <li>3. Secure transactions</li>
            </ul>
          </div>
        </div>

        <div className="p-10 md:p-20 rounded-xl  shadow-xl">
          <div className="mb-2">
            <FaBangladeshiTakaSign className="w-12 h-12" />
          </div>
          <div>
            <h6 className="text-3xl mb-1">Exchange Magic</h6>
            <ul>
              <li>1. Give books new homes</li>
              <li>2. Discover hidden gems</li>
              <li>3. Build connections</li>
            </ul>
          </div>
        </div>

        <div className="p-10 md:p-20 rounded-xl  shadow-xl">
          <div className="mb-2">
            <FaMagnifyingGlassChart className="w-12 h-12" />
          </div>
          <div>
            <h6 className="text-3xl mb-1">Exchange Magic</h6>
            <ul>
              <li>1. Give books new homes</li>
              <li>2. Discover hidden gems</li>
              <li>3. Build connections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
