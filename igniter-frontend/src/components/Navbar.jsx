import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";

// This is master navbar used throughout the website
const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address, disconnectWallet } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col align-center items-center justify-between mb-[35px] gap-6">
      {/* Add Website title in top left */}
      <div className="flex justify-center flex-row">
        <Link to="/">
          <p className="font-epilogue font-extrabold align-center items-center text-[24px] text-[#8c6dfd] break-all">
            IGNITER
          </p>
        </Link>
      </div>

      {/* Show create project buttno if user has connected the metamask */}
      <div className="flex flex-row justify-center gap-6">
        {address && (<div className="flex flex-row justify-center">
          <CustomButton
            btnType="button"
            title={"Create a project"}
            styles={"bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("create-project");
            }}
          />
        </div>)}

        {/* Show Connect/Disconnect Metamask button */}
        {console.log("37address", address)}
        <div className="flex flex-row justify-center">
          <CustomButton
            btnType="button"
            title={address ? "Disconnect Metamask" : "Connect Metamask"}
            styles={address ? "bg-[#8c6dfd]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) disconnectWallet();
              else connect();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
