import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  NotificationAdd,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  const fullName = user?.name;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div
      className={` sm:flex sm:justify-between bg-background-alt py-2 text-neutral-light`}
      // className={`absolute top-0 left-0 right-0 sm:flex sm:justify-between bg-background-alt py-2 text-neutral-light`}
    >
      <FlexBetween className="gap-5">
        <div
          onClick={() => {
            navigate(`/home`);
          }}
          className="text-2xl font-semibold text-primary-main cursor-pointer"
        >
          Sociopedia
        </div>
        <div className="hidden md:block">
          <FlexBetween
            className={`bg-neutral-light px-3 rounded-xl text-neutral-main`}
          >
            <InputBase
              sx={{ fontSize: "14px", color: "var(--color-neutral-main)" }}
              placeholder="Search..."
            />
            <IconButton>
              <Search sx={{ fontSize: "22px" }} />
            </IconButton>
          </FlexBetween>
        </div>
        <div className="sm:hidden">
          <IconButton
            onClick={() => {
              setIsMenuActive(!isMenuActive);
            }}
          >
            {isMenuActive ? (
              <Close className="text-neutral-dark" />
            ) : (
              <Menu className="text-neutral-dark" />
            )}
          </IconButton>
        </div>
      </FlexBetween>
      <FlexBetween
        className={`${
          isMenuActive ? "flex-col" : "hidden"
        } sm:block text-neutral-dark gap-5`}
      >
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
        {/* <Message /> */}
        {/* <NotificationAdd /> */}
        {/* <Help /> */}
        <FormControl variant="standard" value={fullName}>
          <div
            className="*:bg-neutral-light 
          "
          >
            <Select
              value={fullName}
              sx={{
                color: "var(--color-neutral-main)",
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/logout")}>Log Out</MenuItem>
            </Select>
          </div>
        </FormControl>
      </FlexBetween>
    </div>
  );
};

export default Header;
