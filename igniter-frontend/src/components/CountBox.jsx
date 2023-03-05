import React from "react";

const CountBox = ({ title, value }) => {
  return (
    // This is the box element, which contains the title and value
    <div className="flex flex-col items-center w-[150px]">
      {/* This is the title element */}
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
        {/* The value is displayed differently depending on the title */}
        {title == "Goal Achieved" ? value.toLocaleString() + " %" : value}
      </h4>
      {/* This is the subtitle element */}
      <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
