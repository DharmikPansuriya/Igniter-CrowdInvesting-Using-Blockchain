import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Importing ethers library for interacting with Ethereum smart contracts
import { ethers } from "ethers";
// Importing custom hook to access global state using context
import { useStateContext } from "../context";
// Importing custom UI components
import { CustomButton, FormField, Loader } from "../components";
// Importing helper function to check if image URL is valid
import { checkIfImage } from "../utils";

const CreateProject = () => {
  // Initializing hooks to manage state
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createProject, address, connect } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  // This function handle the form change value. Whenever user changes the value in form, it will be triggered.
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // This function handles the submit request of user. It will intrect will smart contract via context/index.jsx file
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit", e)

    // Check if image url is valid or not
    checkIfImage(form.image, async (exists) => {
      // If valid then  process the request
      console.log("exist", exists)
      if (exists) {
        setIsLoading(true);
        // Creating a project by passing form data to the createProject function
        console.log("Goinf for creating")
        await createProject({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        console.log("Came out from createProject")
        setIsLoading(false);
        // Navigate back to the home page after successful submission
        navigate("/");
      }
      // If not valid then give alert message
      else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    // Main container for the form
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] py-20 sm:p-100 p-40">
      {isLoading && <Loader />}
      {/* This will create title in top of the form */}
      <div className="flex justify-center items-center p-[12px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#8c6dfd]">
          List your dream startup!
        </h1>
      </div>

      {/*This is form, where user can enter their startup details */}
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          {/* Name of user */}
          <FormField
            labelName="Your Name *"
            placeholder="John"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          {/* Project Title */}
          <FormField
            labelName="Project Title *"
            placeholder="Give a short title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          {/* URL of image */}
          <FormField
            labelName="Project image *"
            placeholder="Place image URL of your project"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
        </div>

        {/* In detail story/background of startup */}
        <FormField
          labelName="Story/background *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className="flex flex-wrap gap-[40px]">
          {/* Founder goal to raise the ETH */}
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          {/* Last date of investment */}
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          {/* If metamask is connected, then let founder submit detail to blockchain */}
          {address && (
            <CustomButton
              btnType="submit"
              title="Submit "
              styles="bg-[#8c6dfd]"
            />
          )}
          {/* If metamask is not connected, then ask user/founder to connect with metamask */}
          {!address && (
            <CustomButton
              btnType="button"
              title="Click here to connect metamask wallet to submit proposal"
              styles="bg-[#8c6dfd]"
              handleClick={() => {
                connect();
              }}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
