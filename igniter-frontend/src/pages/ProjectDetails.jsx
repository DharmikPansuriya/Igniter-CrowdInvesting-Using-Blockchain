import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { igniterFavicon } from "../assets";

const ProjectDetails = () => {
  // Use the useLocation hook to get the state passed in from the previous page
  const { state } = useLocation();

  // Use the useNavigate hook to navigate to different pages
  const navigate = useNavigate();

  // Use the useStateContext hook to access the contract and address
  const { invest, getInvestments, contract, address } = useStateContext();

  // Use state to keep track of loading state, user input, and list of investors
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [investors, setInvestors] = useState([]);

  // Calculate the number of days remaining until the project deadline
  const remainingDays = daysLeft(state.deadline);

  // Fetch the list of investors for the current project
  const fetchInvestors = async () => {
    const data = await getInvestments(state.pId);
    setInvestors(data);
  };

  // Use useEffect to fetch the investors when the contract or address changes
  useEffect(() => {
    if (contract) fetchInvestors();
  }, [contract, address]);

  // Handle user investment
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
          {remainingDays > 0 ? (
            <CountBox title="Days Left" value={remainingDays} />
          ) : (
            <CountBox title="Days Ago" value={remainingDays * -1} />
          )}
          {remainingDays > 0 ? (
            <CountBox title={`Raised of ${state.goal}`} value={state.balance} />
          ) : (
            <CountBox
              title="Goal Achieved"
              value={(state.balance * 100) / state.goal}
            />
          )}

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
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
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
                <h4 className="font-epilogue font-semibold text-[14px] text-[#85859e] break-all">
                  {state.founder}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#85859e] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Investors
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {investors.length > 0 ? (
                investors.map((item, index) => (
                  <div
                    key={`${item.investor}-${index}`}
                    className="flex justify-left items-center gap-10"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#85859e] leading-[26px] break-ll">
                      {index + 1}. {item.investor}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#85859e] leading-[26px] break-ll">
                      {" - "}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#85859e] leading-[26px] break-ll">
                      {item.investment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#85859e] leading-[26px] text-justify">
                  No investors yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        {remainingDays > 0 && (
          <div className="flex-1">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
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
                    Note: Coin will be debited from connected metamask wallet.
                  </h4>
                </div>

                <CustomButton
                  btnType="button"
                  title="Make the transaction"
                  styles="w-full bg-[#8c6dfd]"
                  handleClick={handleInvest}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
