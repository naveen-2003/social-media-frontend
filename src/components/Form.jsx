import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import CustomInput from "./CustomInput";
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice";

const Form = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [file, setFile] = useState(null);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    multiple: false,
    accept: ".jpg, .png, .jpeg",
  });

  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("picture", file);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      setFormData({});
      e.target.reset();
      setIsLoginPage(true);
    }
  };

  const login = async (e) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setLogin(data));
      setFormData({});
      navigate("/home");
      e.target.reset();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    isLoginPage ? login(e) : register(e);
  };
  return (
    <div className=" justify-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-flow-row grid-cols-4 gap-x-4 gap-y-3 text-neutral-dark"
      >
        {!isLoginPage && (
          <>
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="firstName"
              type="text"
              className="col-span-2"
              label="First Name"
            />
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="lastName"
              type="text"
              className="col-span-2"
              label="Last Name"
            />
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="location"
              type="text"
              className="col-span-4"
              label="Location"
            />
            <CustomInput
              formData={formData}
              handleChange={handleChange}
              name="occupation"
              type="text"
              className="col-span-4"
              label="Occupation"
            />
            <div className="col-span-4 border rounded-md border-neutral-mediumMain/95 cursor-pointer">
              <div
                className="px-5 py-4  flex justify-between"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {isDragActive ? (
                  <p className="text-primary-main">Drop the files here ...</p>
                ) : file ? (
                  <>
                    <p className="text-primary-main">{file.name}</p>
                    <Edit className="" sx={{ width: "16px" }} />
                  </>
                ) : (
                  <p className="text-neutral-medium">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        <CustomInput
          formData={formData}
          handleChange={handleChange}
          name="email"
          type="email"
          className="col-span-4"
          label="Email Address"
        />
        <CustomInput
          formData={formData}
          handleChange={handleChange}
          name="password"
          type="password"
          className="col-span-4"
          label="Password"
        />
        <button
          type="submit"
          className="mb-4 bg-primary-main col-span-4 px-3 py-2 text-background-default font-semibold hover:bg-primary-main/50 hover:text-background-default"
        >
          {isLoginPage ? "Login" : "Register"}
        </button>
      </form>
      <p
        onClick={() => {
          setIsLoginPage(!isLoginPage);
        }}
        className="text-primary-main underline text-sm cursor-pointer"
      >
        {isLoginPage
          ? "Not a user? Click here to register!!"
          : "Already signed up? Click here to Login!!"}
      </p>
    </div>
  );
};

export default Form;
