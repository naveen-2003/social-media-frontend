import React from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const UserWidget = ({ user }) => {
  const id = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  return (
    <div className="bg-background-alt px-5 py-5 rounded-xl text-sm ">
      <FlexBetween className="">
        <FlexBetween className="gap-2">
          <div className="flex justify-center items-center">
            <img
              className="h-[48px] w-[48px] rounded-full object-cover"
              src={user?.picturePath}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>
          <div>
            <div className="font-semibold text-neutral-dark text-base">
              {`${user?.firstName} ${user?.lastName}`}
            </div>
            <div className="text-xs font-medium">
              {user?.friends?.length} friends
            </div>
          </div>
        </FlexBetween>
        {id === user._id && (
          <FlexBetween className="text-neutral-dark">
            <IconButton
              onClick={() => {
                navigate("/profile/editprofile");
              }}
              color="inherit"
            >
              <ManageAccountsOutlined fontSize="medium" />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      <div className="w-full my-3 h-[1px] bg-neutral-mediumMain/50 " />
      <div>
        <div className="flex gap-2">
          <FlexBetween className="text-neutral-dark">
            <LocationOnOutlined fontSize="medium" />
          </FlexBetween>
          <div>{user?.location}</div>
        </div>
        <div className="flex gap-2">
          <FlexBetween className="text-neutral-dark">
            <WorkOutlineOutlined fontSize="medium" />
          </FlexBetween>
          <div>{user?.occupation}</div>
        </div>
      </div>
      <div className="w-full my-3 h-[2px] bg-neutral-mediumMain/50 " />
      <div>
        <FlexBetween>
          <div>Who's viewed your profile</div>
          <div className="text-neutral-dark text-sm">{user?.viewedProfile}</div>
        </FlexBetween>
        <FlexBetween>
          <div>Impression of your post </div>
          <div className="text-neutral-dark text-sm ">{user?.impressions}</div>
        </FlexBetween>
      </div>
      <div className="w-full my-3 h-[1.5px] bg-neutral-mediumMain/50 " />
      <div>
        <div className="text-neutral-dark font-semibold">Social Profiles</div>
        <FlexBetween className="text-neutral-dark">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <img src="../assets/twitter.png" alt="twitter" />
            </div>
            <div>
              <div className="font-medium text-neutral-dark">Twitter</div>
              <div className="text-xs font-medium text-neutral-main">
                Social Platform
              </div>
            </div>
          </div>
          {id === user._id && <EditOutlined fontSize="small" />}
        </FlexBetween>
        <FlexBetween className="text-neutral-dark">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <img src="../assets/linkedin.png" alt="Linkedin" />
            </div>
            <div>
              <div className="font-medium text-neutral-dark">Linkedin</div>
              <div className="text-xs font-medium text-neutral-main">
                Network Platform
              </div>
            </div>
          </div>
          {id === user._id && <EditOutlined fontSize="small" />}
        </FlexBetween>
      </div>
    </div>
  );
};

export default UserWidget;
