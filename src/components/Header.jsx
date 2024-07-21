import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  FormControl,
  Tooltip,
  Avatar,
  ListItemIcon,
  ClickAwayListener,
} from "@mui/material";

import { Menu, MenuItem } from "@mui/base";
import {
  Search,
  DarkMode,
  LightMode,
  Close,
  Logout,
  Settings,
  SafetyDivider,
  Menu as MenuIcon,
  AccountCircle,
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
  const picturePath = user?.picturePath;
  const [dropDownActive, setDropDownActive] = useState(false);

  return (
    <div
      className={`z-50 sm:flex sm:justify-between bg-background-alt py-2 text-neutral-light`}
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
        {user && (
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
        )}
        <div className="sm:hidden">
          <IconButton
            onClick={() => {
              setIsMenuActive(!isMenuActive);
            }}
          >
            {isMenuActive ? (
              <Close className="text-neutral-dark" />
            ) : (
              <MenuIcon className="text-neutral-dark" />
            )}
          </IconButton>
        </div>
      </FlexBetween>
      <FlexBetween
        className={`${
          isMenuActive ? "flex-col sm:flex-row" : "hidden"
        } sm:flex text-neutral-dark gap-5`}
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
        {user && (
          // <FormControl variant="standard" value={fullName}>
          //   <div
          //     className="*:bg-neutral-light
          // "
          //   >
          //     <Select
          //       value={<IconButton>
          //         hello
          //         {/* <img src={picturePath} alt={fullName} /> */}
          //       </IconButton>}
          //       sx={{
          //         color: "var(--color-neutral-main)",
          //         width: "150px",
          //         borderRadius: "0.25rem",
          //         p: "0.25rem 1rem",
          //         "& .MuiSvgIcon-root": {
          //           pr: "0.25rem",
          //           width: "3rem",
          //         },
          //       }}
          //       input={<InputBase />}
          //     >
          //       <MenuItem value={fullName}>
          //         <Typography>{fullName}</Typography>
          //       </MenuItem>
          //       <MenuItem onClick={() => navigate("/logout")}>Log Out</MenuItem>
          //     </Select>
          //   </div>
          // </FormControl>
          <>
            <div className="relative">
              <Tooltip title="Account settings">
                <IconButton
                  onClick={() => {
                    setDropDownActive(!dropDownActive);
                  }}
                  size="small"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img src={picturePath} alt={fullName} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              {dropDownActive && (
                <ClickAwayListener onClickAway={() => setDropDownActive(false)}>
                  <Menu
                    onClick={() => setDropDownActive(false)}
                    className="absolute -left-full sm:right-0 sm:left-auto w-fit bg-neutral-light text-neutral-dark font-light rounded-md cursor-pointer"
                  >
                    <MenuItem
                      onClick={() => {
                        navigate(`/profile/${user?.id}`);
                      }}
                      className="flex gap-3 items-center px-3 pt-2 rounded-t-md pb-2 hover:bg-neutral-medium"
                    >
                      <AccountCircle
                        fontSize="small"
                        className="text-neutral-dark"
                      />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate(`/profile`);
                      }}
                      className="flex gap-3 items-center px-3 py-2 hover:bg-neutral-medium"
                    >
                      <Settings
                        fontSize="small"
                        className="text-neutral-dark"
                      />
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate(`/logout`);
                      }}
                      className="flex gap-3 items-center px-3 py-2 rounded-b-md hover:bg-neutral-medium"
                    >
                      <Logout fontSize="small" className="text-neutral-dark" />
                      Logout
                    </MenuItem>
                  </Menu>
                </ClickAwayListener>
              )}
            </div>
          </>
        )}
      </FlexBetween>
    </div>
  );
};

export default Header;
