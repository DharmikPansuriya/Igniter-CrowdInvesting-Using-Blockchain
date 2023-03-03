import React from "react";
import { useNavigate } from "react-router-dom";

import InvestCard from "./InvestCard";
import { loader } from "../assets";

const DisplayProjects = ({ title, isLoading, projects }) => {
  const navigate = useNavigate();

  const handleNavigate = (project) => {
    navigate(`/project-details/${project.title}`, { state: project });
  };

  return (
    <div>
      {title === "Live Projects" && (
        <div className="flex flex-col justify-left items-left my-[80px]">
          <div>
            <h1 className="font-epilogue font-semibold lg:text-[40px] sm:text-[32px] text-left text-[#8c6dfd]">
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

      <h1 className="flex flex-row items-center font-epilogue font-semibold text-[18px] text-white text-left">
        <div
          className={`ml-0 mr-3 w-[10px] h-[10px] 
          ${
            (title === "Live Projects" || title === "My Live Projects") &&
            "bg-[#00FF00]"
          } 
          ${
            (title === "Archived Projects" ||
              title === "My Archived Projects") &&
            "bg-[#FF0000]"
          } 
          rounded-full`}
        ></div>
        {title} ({projects.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] mb-[100px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && projects.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any project yet
          </p>
        )}

        {!isLoading &&
          projects.length > 0 &&
          projects.map((project) => (
            <InvestCard
              key={project.id}
              {...project}
              handleClick={() => handleNavigate(project)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayProjects;
