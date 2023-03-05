import React from "react";

// custom button component that can be used throughout the app
const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    // button wil be created using given params from parent component
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[13px] leading-[20px] text-white px-4 py-3 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
