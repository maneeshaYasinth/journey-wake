import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
const WakeUp = () => {
  return (
    <div className="mt-20 flex flex-col font-poppins text-black">
      <div className=" flex flex-col justify-center text-center bg-white p-5 rounded-2xl shadow-xl shadow-blue-900 md:p-20 ">
        <label className=" text-2xl md:text-3xl font-semibold" htmlFor="">
          Total Distance
        </label>
        <div>
          <input
            className="mt-5 w-[200px] md:w-[300px] h-[50px] rounded-[10px] p-[10px] outline-none border-[2px] border-gray-500"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <section className="flex flex-col justify-center text-center items-center md:px-20 mt-10 gap-5 border-2 rounded-md border-gray-300 px-10 py-10 ">
        <h1 className=" text-2xl md:text-3xl font-semibold text-white">
          Wake Up
        </h1>
        <Button
          className="   text-2xl md:text-3xl font-poppins "
          text={"5 KM"}
          onClick={() => {
            alert("wake up in 5 KM");
          }}
        />
        <Button
          className="  text-2xl md:text-3xl font-poppins "
          text={"10 KM"}
          onClick={() => {
            alert("wake up in 10 KM");
          }}
        />
        <Button
          className=" text-2xl md:text-3xl font-poppins "
          text={"15 KM"}
          onClick={() => {
            alert("wake up in 15 KM");
          }}
        />
      </section>
      <div className=" flex justify-center text-center">
        <Link to={"/currentPosition"}>
          <Button
            className=" mt-10  text-2xl md:text-3xl font-poppins "
            text={"Set"}
            onClick={() => {
              alert("wake us setup succussfully");
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default WakeUp;
