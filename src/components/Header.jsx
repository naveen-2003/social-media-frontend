import React, { useEffect } from "react";
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
import { setLogout, setMode } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  const fullName = user?.name;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <FlexBetween className={`bg-background-alt py-2 text-neutral-light`}>
      <FlexBetween className="gap-5">
        <div className="text-2xl font-semibold text-primary-main">
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
      </FlexBetween>
      <FlexBetween className={`text-neutral-dark gap-5`}>
        <IconButton
          onClick={() => {
            dispatch(setMode());
          }}
        >
          {/* {mode === "light" ? <DarkMode  /> : <LightMode sx={{color:""}} />} */}
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
        <Message />
        <NotificationAdd />
        <Help />
        {/* <div className="">
          {fullName}
        </div> */}
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
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </div>
        </FormControl>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Header;
