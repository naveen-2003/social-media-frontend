import React, { useEffect } from "react";
import Form from "../components/Form";
import { setMode } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  return (
    <>
      <div className="relative text-center mb-8 bg-background-alt text-primary-main font-semibold text-2xl py-4">
        <div>Sociopedia</div>
        <div className="absolute right-2 top-0 bottom-0 flex ">
          <IconButton
            onClick={() => {
              dispatch(setMode());
            }}
          >
            {mode === "light" ? (
              <DarkMode
                className="text-neutral-dark "
                sx={{ fontSize: "25px" }}
              />
            ) : (
              <LightMode
                className="text-neutral-dark "
                sx={{ fontSize: "25px" }}
              />
            )}
          </IconButton>
        </div>
      </div>
      <div className=" text-neutral-main flex justify-center  ">
        <div className="w-full max-w-[800px] bg-background-alt px-10 py-6 rounded-2xl">
          <div className="text-neutral-dark">
            Welcome to Sociopedia, the Social Media for Sociopaths!
          </div>
          <Form />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
