import React from "react";
import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";
import { loader } from "../assets";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      {title === "All Projects" && (
        <div className="flex flex-col justify-left items-left my-[80px]">
          <div>
            <h1 className="font-epilogue font-semibold lg:text-[40px] sm:text-[32px] text-white text-left text-[#8c6dfd]">
              Welcome onboard 🚀
            </h1>
          </div>
          {/* <br /> */}
          <div>
            <h1 className="font-epilogue font-semibold lg:text-[40px] sm:text-[32px] text-white text-left ">
              It's Crowd-Investing Platform Powered <br /> by Blockchain &
              Crypto.
            </h1>
          </div>
        </div>
      )}

      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] mb-[100px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
