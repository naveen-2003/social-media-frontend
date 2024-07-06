import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../store/authSlice";
import { PersonAddAlt1, PersonRemoveAlt1 } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch";

const Friend = ({ friendId, userPicturePath, location, name, friends }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${friendId}`);
  };
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);
  const { userId: viewUserId } = useParams();
  const userFriends = useSelector((state) => state.auth.user.friends);
  const token = useSelector((state) => state.auth.token);
  const isFriend =
    // viewUserId === friendId
    //   ? true :
    userFriends?.find((friend) => friend._id === friendId);
  const addRemoveFriend = async () => {
    if (token) {
      const response = await apiFetch(`/users/${id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    }
  };
  useEffect(() => {}, [isFriend, friends]);
  return (
    <FlexBetween>
      <div onClick={handleNavigate} className=" flex gap-2 cursor-pointer">
        <div className="flex justify-center items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={userPicturePath}
            alt={`${name}`}
          />
        </div>
        <div>
          <div className="font-semibold text-neutral-dark text-sm">{name}</div>
          <div className="text-xs font-medium">{location}</div>
        </div>
      </div>
      {id !== friendId && (
        <div className="">
          <button onClick={addRemoveFriend}>
            {isFriend ? <PersonRemoveAlt1 /> : <PersonAddAlt1 />}
          </button>
        </div>
      )}
    </FlexBetween>
  );
};

export default Friend;
