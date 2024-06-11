import React, { useState } from "react";
import Button from "../Button/Button";
import TurnOn from "../TurneOnLocation/TurnOn";
import { Link } from "react-router-dom";

const StartPage = () => {


  return (
    <div>
      <div className=" font-poppins flex flex-col text-center items-center justify-center md:px-20 ">
        <div>
          <h1 className=" font-poppins text-2xl text-white mt- md:text-3xl">
            Enjoy the ride ,
          </h1>
        </div>
        <div className=" mt-20 md:mt-10">
          <img className=" " src="/Jouney Wake.png" alt=" main logo" />
        </div>
        <div>
          <h2 className=" text-white font-semibold text-3xl md:text-4xl mt-5">
            We'll wake you up just in time!
          </h2>
        </div>

        <div className=" mt-[200px] md:mt-[150px]">
          <Link to={"/turnOn"}>
          <Button className=" text-2xl md:text-3xl"
          
          text="Get Started"  />
          </Link>
        </div>
        <div >
          {/* <Link to={"/"}>
          <Button className=" text-2xl md:text-3xl"
          
          text="back"  />
          </Link> */}
        </div>
        {/* <div className=" mt-[200px] md:mt-[150px]">
        <Button className=" text-2xl md:text-3xl" text="Get Started" onClick={toggleNext} />
        {ShowStartPage ? "":<TurnOn/>  }
      </div> */}
      </div>

      
    </div>
  );
};

export default StartPage;
