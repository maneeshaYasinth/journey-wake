import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import PlaceMap from "../PlaceMap/PlaceMap";
const MapNew = () => {
  return (
    <div className=" flex flex-col mt-20">
      <section className=" flex flex-col justify-center text-center items-center md:px-20 ">
        {/* map display */}
        <div>
          {/* <MainMap /> */}
          <PlaceMap />
        </div>
        {/* set location */}
        <div className=" font-poppins bg-white p-4 px-5 rounded-2xl shadow-xl shadow-blue-900 md:p-20 ">
          <div className="">
            <div className=" font-semibold text-xl md:text-2xl ">
              <h1>Starting point</h1>
            </div>
            <div className=" flex  justify-between gap-10 mt-5">
              <div className=" text-4xl ">
                <MdMyLocation />
              </div>
              <div>
                <input
                  className=" w-[300px] h-[50px] rounded-[10px] p-[10px] outline-none border-[2px] border-gray-500"
                  type="text"
                  placeholder="Your location"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h1 className="font-semibold text-xl md:text-2xl">
                Finish Point
              </h1>
            </div>
            <div className=" flex  justify-between mt-5">
              <div className=" text-3xl">
                <FaLocationArrow />
              </div>
              <div>
                <input
                  className=" w-[300px] h-[50px] rounded-[10px] p-[10px] outline-none border-[2px] border-gray-500"
                  type="text"
                  placeholder="Destination"
                />
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className=" mt-10  text-2xl md:text-3xl font-poppins ">
          <Link to={"/wakeup"}>
            <Button
              text={"Set Your Destination"}
              onClick={() => {
                alert("Destination set succussfully");
              }}
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MapNew;
