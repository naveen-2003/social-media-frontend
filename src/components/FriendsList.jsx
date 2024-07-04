import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../store/authSlice";
import Friend from "./Friend";

const FriendsList = ({ userId, friends }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.user.id);
  // const [viewFriends, setViewFriends] = useState([]);
  const getFriends = async () => {
    if (token) {
      const response = await fetch(`/api/users/${userId}/friends`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      if (id === userId) dispatch(setFriends({ friends: data }));
      // else setViewFriends(data);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId]);

  return (
    <div className="bg-background-alt px-5 py-5 rounded-xl text-sm ">
      <div className="text-neutral-dark font-semibold mb-3">Friends List</div>
      <div className="flex flex-col gap-2">
        {friends?.length === 0 ? (
          <div>No friends yet</div>
        ) : (
          friends?.map((friend, _key) => (
            <Friend
              friends={friends}
              key={_key}
              friendId={friend._id}
              name={friend.firstName + " " + friend.lastName}
              userPicturePath={friend.picturePath}
              location={friend.location}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsList;
