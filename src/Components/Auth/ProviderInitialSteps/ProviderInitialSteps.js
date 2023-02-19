import { Button } from "@mui/material";
import React, { useState } from "react";
import RenderInput from "../../../utils/RenderInput";

const passwordFields = [
  {
    id: "password_1",
    title: "Password",
    placeholder: "Password",
    type: "input",
    required: true,
  },
  {
    id: "password_2",
    title: "Confirm Password",
    placeholder: "Confirm Password",
    type: "input",
    required: true,
  },
];

const storeDetailFields = [
  {
    id: "email",
    title: "Support Email",
    placeholder: "Enter your email address",
    type: "input",
    required: true,
  },
  {
    id: "mobile_number",
    title: "Support Mobile",
    placeholder: "Enter your mobile number",
    type: "input",
    required: true,
  },
  {
    id: "supported_product_categories",
    title: "Supported product categories",
    placeholder: "Supported product categories",
    options: [
      { key: "Grocery", value: "grocery" },
      { key: "Beauty & Personal Care", value: "beauty_and_personal_care" },
      { key: "Fashion", value: "fashion" },
      { key: "Home and Decor", value: "home_and_decor" },
      { key: "F&B", value: "f_and_b" },
    ],
    type: "select",
    required: true,
  },
  {
    id: "multi_supported_product_categories",
    title: "Multi Supported product categories",
    placeholder: "Supported product categories",
    options: [
      { key: "Grocery", value: "grocery" },
      { key: "Beauty & Personal Care", value: "beauty_and_personal_care" },
      { key: "Fashion", value: "fashion" },
      { key: "Home and Decor", value: "home_and_decor" },
      { key: "F&B", value: "f_and_b" },
    ],
    type: "multi-select",
    required: false,
  },
  {
    id: "store_location",
    title: "Store Location",
    placeholder: "Store Location",
    type: "input",
    required: false,
  },
  {
    id: "location_availability",
    title: "Location availability",
    options: [
      { key: "PAN India", value: "pan_india" },
      { key: "World Wide", value: "world_wide" },
    ],
    type: "checkbox",
    required: false,
  },
  {
    id: "default_cancellable",
    title: "Default cancellable setting",
    options: [
      { key: "Cancellable", value: "cancellable" },
      { key: "Non Cancellable", value: "non_cancellable" },
    ],
    type: "radio",
    required: false,
  },
  {
    id: "default_returnable",
    title: "Default returnable setting",
    options: [
      { key: "Returnable", value: "returnable" },
      { key: "Non Returnable", value: "non_returnable" },
    ],
    type: "radio",
    required: false,
  },
  {
    id: "logo",
    title: "Logo",
    type: "upload",
    required: false,
  },
];

const ProviderInitialSteps = () => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState({ password_1: "", password_2: "" });
  const [storeDetails, setStoreDetails] = useState({
    logo: "",
    supported_product_categories: "none",
    multi_supported_product_categories: [],
    store_location: "",
    location_availability: [],
    default_cancellable: "",
    default_returnable: "",
    email: "",
    mobile_number: "",
  });

  const renderSetPasswordFields = () => {
    return passwordFields.map((item) => (
      <RenderInput item={item} state={password} stateHandler={setPassword} />
    ));
  };

  const renderStoreDetailsFields = () => {
    return storeDetailFields.map((item) => (
      <RenderInput
        item={item}
        state={storeDetails}
        stateHandler={setStoreDetails}
      />
    ));
  };

  const renderHeading = () => {
    if (step == 1) return "Set Password";
    if (step == 2) return "Provider Store details";
  };

  const renderSteps = () => {
    if (step == 1) return renderSetPasswordFields();
    if (step == 2) return renderStoreDetailsFields();
  };

  return (
    <>
      <div className="mx-auto !p-5 h-screen min-vh-100 overflow-auto bg-[#f0f0f0]">
        <div className="h-full flex fex-row items-center justify-center">
          <div
            className="flex w-full md:w-2/4 bg-white px-4 py-4 rounded-md shadow-xl h-max"
            style={{ minHeight: "85%", maxHeight: "100%", overflow: "auto" }}
          >
            <div className="m-auto w-10/12 md:w-3/4 h-max">
              <p className="text-2xl font-semibold mb-4 text-center">
                {renderHeading()}
              </p>
              <div>{renderSteps()}</div>
              <div className="flex mt-6">
                <Button
                  size="small"
                  style={{ marginRight: 10 }}
                  variant="text"
                  onClick={() => setStep(step - 1)}
                  disabled={step == 1}
                >
                  Back
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    step == 2 ? alert("finished") : setStep(step + 1);
                  }}
                  //  disabled={checkDisabled()}
                >
                  {step == 2 ? "Finish" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderInitialSteps;
