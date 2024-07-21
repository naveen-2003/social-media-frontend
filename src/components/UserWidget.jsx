import React, { useState } from "react";
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
import FriendsList from "./FriendsList";

const UserWidget = ({ user }) => {
  const id = useSelector((state) => state.auth.user.id);
  const friends = useSelector((state) => state.auth.user.friends);
  const navigate = useNavigate();
  const [openFriendList, setOpenFriendList] = useState(false);
  return (
    <div className="bg-background-alt px-5 py-5 rounded-xl text-sm ">
      {openFriendList && (
        <div
          onClick={() => setOpenFriendList(!openFriendList)}
          className="lg:hidden fixed z-50 left-0 right-0 bottom-0 top-0 bg-black/50 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <FriendsList userId={id} friends={friends} />
          </div>
        </div>
      )}

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
            <div
              onClick={() => setOpenFriendList(!openFriendList)}
              className="text-xs font-medium cursor-pointer lg:cursor-default"
            >
              {user?.friends?.length} friends
            </div>
          </div>
        </FlexBetween>
        {id === user._id && (
          <FlexBetween className="text-neutral-dark">
            <IconButton
              onClick={() => {
                navigate("/profile");
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
        <div className="flex gap-2">
          {user?.links?.length === 0 ? (
            <div>No links found</div>
          ) : (
            user?.links?.map((link, index) => {
              return (
                <a key={link + index} href={link} target="_blank">
                  <img
                    className="rounded-full w-5 h-5"
                    src={`http://www.google.com/s2/favicons?sz=32&domain=${link}`}
                    alt={`Link : ${link}`}
                  />
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
