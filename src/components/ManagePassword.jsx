import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomInput from "./CustomInput";
import { useAlert } from "./AlertContext";
import { apiFetch } from "../utils/apiFetch";

const ManagePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setIsChanged(true);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;
    try {
      const response = await apiFetch(`/users/${user.id}/updatepassword`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      setIsChanged(false);
      setFormData({});
      e.target.reset();
      showAlert(data.msg, "success");
    } catch (error) {
      console.log(error);
      showAlert(error.message, "error");
    }
  };

  return (
    <div className="w-full">
      <form
        data-netlify="true"
        className="flex flex-col justify-between items-center h-full *:w-full *:max-w-xl [&_.custom-input]:bg-background-default  [&_.input-label]:bg-background-default"
        onSubmit={handleSubmit}
      >
        <div className="*:w-full *:max-w-md flex flex-col items-center">
          <div className="text-neutral-dark font-semibold text-lg text-center">
            Change Password
          </div>
          <CustomInput
            formData={formData}
            handleChange={handleChange}
            name="oldpassword"
            type="password"
            className="col-span-2 text-neutral-dark"
            label="Old Password"
          />
          <CustomInput
            formData={formData}
            handleChange={handleChange}
            name="password"
            type="password"
            className="col-span-2 text-neutral-dark"
            label="New Password"
          />
          <CustomInput
            formData={formData}
            handleChange={handleChange}
            name="repeatpassword"
            type="password"
            className="col-span-2 text-neutral-dark"
            label="Repeat Password"
          />
        </div>
        <div className="flex gap-5 items-center justify-end w-full">
          {isChanged && (
            <button
              onClick={() => {
                setIsChanged(false);
                setFormData({});
              }}
              className="bg-neutral-light px-3 py-2 mt-5 rounded-lg text-neutral-medium hover:bg-red-800 hover:text-neutral-dark"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`px-3 py-2 mt-5 rounded-lg ${
              isChanged
                ? "bg-primary-main text-background-default cursor-pointer hover:bg-primary-dark"
                : "bg-neutral-light text-neutral-medium cursor-not-allowed hover:bg-neutral-light hover:text-neutral-mediumMain"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagePassword;
