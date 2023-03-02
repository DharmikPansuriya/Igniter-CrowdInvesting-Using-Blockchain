import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { igniterFavicon } from "../assets";

const ProjectDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { invest, getInvestments, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [investors, setInvestors] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchInvestors = async () => {
    const data = await getInvestments(state.pId);

    setInvestors(data);
  };

  useEffect(() => {
    if (contract) fetchInvestors();
  }, [contract, address]);

  const handleInvest = async () => {
    setIsLoading(true);

    await invest(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="project"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(state.goal, state.balance)}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.goal}`} value={state.balance} />
          <CountBox title="Total Backers" value={investors.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <div className=" flex flex-row items-center flex-wrap gap-[14px]">
              <div>
                <h4 className="font-epilogue font-semibold text-[36px] text-[#8c6dfd] break-all ">
                  {state.title}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#8c6dfd] uppercase">
              Founder
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={igniterFavicon}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.founder}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#8c6dfd] uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#8c6dfd] uppercase">
              Investors
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {investors.length > 0 ? (
                investors.map((item, index) => (
                  <div
                    key={`${item.investor}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] break-ll">
                      {index + 1}. {item.investor}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] break-ll">
                      {item.investment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">
                  No investors yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-[#8c6dfd] uppercase">
            Invest
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white">
              Invest in the project
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Project"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleInvest}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
