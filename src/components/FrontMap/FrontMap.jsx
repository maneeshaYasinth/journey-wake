import React from "react";
import MainMap from "../MainMap/MainMap";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const FrontMap = () => {
  return (
    <div>
      <MainMap />
      <div className=" mt-[50px] md:mt-[150px] flex text-center justify-center">
        <Link to={"/"}>
          <Button className=" text-2xl md:text-3xl" text="Home" />
        </Link>
      </div>
    </div>
  );
};

export default FrontMap;
