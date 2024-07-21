import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import CustomInput from "./CustomInput";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/authSlice";
import { useAlert } from "./AlertContext";
import { apiFetch } from "../utils/apiFetch";

const Form = () => {
  const [isLoginPage, setIsLoginPage] = useState(true); //true
  const [formData, setFormData] = useState({}); //{}
  const [isOTPSent, setIsOTPSent] = useState(false); //false
  const [isVerified, setIsVerified] = useState(false); //false
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [token, setToken] = useState(null);
  const { showAlert } = useAlert();
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
    const response = await apiFetch("/auth/register", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      e.target.reset();
      setFormData({});
      showAlert(data.msg, "success");
      setIsLoginPage(true);
      return;
    }
    if (response.status < 500) {
      showAlert(data.msg, "info");
      return;
    }
    showAlert("Server Error", "error");
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    const response = await apiFetch("/auth/sendotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      e.target.reset();
      setFormData({});
      showAlert(data.msg, "success");
      setToken(data.token);
      setIsOTPSent(true);
      return;
    }
    if (response.status < 500) {
      showAlert(data.msg, "info");
      return;
    }
    showAlert("Server Error", "error");
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    const response = await apiFetch("/auth/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      e.target.reset();
      setFormData({});
      showAlert(data.msg, "success");
      setToken(data.token);
      setIsVerified(true);
      return;
    }
    if (response.status < 500) {
      showAlert(data.msg, "info");
      return;
    }
    showAlert("Server Error", "error");
  };

  const sendResetLink = async (e) => {
    const response = await apiFetch("/auth/sendresetlink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      e.target.reset();
      setFormData({});
      setIsResetPassword(false);
      showAlert(data.msg, "success");
      return;
    }
    showAlert(data.msg, "info");
  };
  const login = async (e) => {
    const response = await apiFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      e.target.reset();
      setFormData({});
      showAlert(data.msg, "success");
      dispatch(setLogin(data));
      navigate("/home");
      return;
    }
    if (response.status < 500) {
      showAlert(data.msg, "info");
      return;
    }
    showAlert("Server Error", "error");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    isLoginPage
      ? isResetPassword
        ? sendResetLink(e)
        : login(e)
      : !isOTPSent
      ? sendOTP(e)
      : !isVerified
      ? verifyOTP(e)
      : register(e);
  };
  return (
    <div className=" justify-center">
      <form
        data-netlify="true"
        onSubmit={handleSubmit}
        className="grid grid-flow-row grid-cols-4 gap-x-4 gap-y-3 text-neutral-dark [&_.custom-input]:bg-background-alt  [&_.input-label]:bg-background-alt"
      >
        {!isLoginPage && isOTPSent && isVerified && (
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
        {isOTPSent && !isVerified && (
          <CustomInput
            formData={formData}
            handleChange={handleChange}
            name="otp"
            type="text"
            className="col-span-4"
            label="OTP"
          />
        )}

        {(isLoginPage || !isOTPSent) && (
          <CustomInput
            formData={formData}
            handleChange={handleChange}
            name="email"
            type="email"
            className="col-span-4"
            label="Email Address"
          />
        )}
        {isLoginPage && !isResetPassword ? (
          <CustomInput
            formData={formData}
            handleChange={handleChange}
            name="password"
            type="password"
            className="col-span-4"
            label="Password"
          />
        ) : (
          isVerified && (
            <>
              <CustomInput
                formData={formData}
                handleChange={handleChange}
                name="password"
                type="password"
                className="col-span-4"
                label="Password"
              />

              <CustomInput
                formData={formData}
                handleChange={handleChange}
                name="confirmpassword"
                type="password"
                className="col-span-4"
                label="Confirm password"
              />
            </>
          )
        )}
        <button
          type="submit"
          className="mb-4 bg-primary-main col-span-4 px-3 py-2 text-background-default font-semibold hover:bg-primary-main/50 hover:text-background-default"
        >
          {isLoginPage
            ? isResetPassword
              ? "Send Reset Link"
              : "Login"
            : !isOTPSent
            ? "Send OTP"
            : !isVerified
            ? "Verify OTP"
            : "Register"}
        </button>
      </form>
      <div className="flex justify-between">
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
        {isLoginPage && (
          <p
            onClick={() => {
              setIsResetPassword(!isResetPassword);
            }}
            className="text-primary-main underline text-sm cursor-pointer"
          >
            {isResetPassword ? "Go to Login" : "Forgot Password?"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
