import Header from "../components/Header";
import { useAlert } from "../components/AlertContext";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { apiFetch } from "../utils/apiFetch";

const ResetPassword = () => {
  const [formData, setFormData] = useState({}); //{}
  const { showAlert } = useAlert();
  const { token } = useParams();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmpassword) {
      showAlert("Please provide both password and confirm password", "info");
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      showAlert("Passwords do not match", "info");
      return;
    }
    try {
      const response = await apiFetch(`/auth/resetpassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw Error(data.msg);
      }
      showAlert(data.msg, "success");
      navigate("/");
    } catch (error) {
      showAlert(error.message, "error");
    }
  };
  return (
    <>
      <div className=" absolute left-0 right-0 top-0 bottom-0 items-center text-neutral-main flex justify-center  ">
        <div className="w-full max-w-[800px] bg-background-alt px-10 py-6 rounded-2xl">
          <div className="text-neutral-dark text-center">
            Reset your password
          </div>
          <form
            data-netlify="true"
            onSubmit={handleSubmit}
            className="[&_.custom-input]:bg-background-alt  [&_.input-label]:bg-background-alt flex flex-col gap-2 text-neutral-dark"
          >
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="password"
              type="password"
              className="col-span-2"
              label="New Password"
            />
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="confirmpassword"
              type="password"
              className="col-span-2"
              label="Confirm New Password"
            />
            <button
              className="mb-4 bg-primary-main col-span-4 px-3 py-2 text-background-default font-semibold hover:bg-primary-main/50 hover:text-background-default"
              type="submit"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
