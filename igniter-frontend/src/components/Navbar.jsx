import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#8c6dfd]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2 bg-[#8c6dfd]" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2  bg-[#8c6dfd] ${
          isActive !== name && "grayscale"
        }`}
      />
    )}
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col align-center items-center justify-between mb-[35px] gap-6">
      <div className="flex justify-center flex-row">
        <Link to="/">
        <p className="font-epilogue font-extrabold align-center items-center text-[24px] text-[#8c6dfd] break-all">
          IGNITER
        </p>
        </Link>
      </div>

      <div className="flex flex-row justify-center">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect Wallet"}
          styles={address ? "bg-[#8c6dfd]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
