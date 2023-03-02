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
            You have not created any campigns yet
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