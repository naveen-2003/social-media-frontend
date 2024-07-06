import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserWidget from "../components/UserWidget";
import PostFeed from "../components/PostFeed";
import FriendsList from "../components/FriendsList";
import { apiFetch } from "../utils/apiFetch";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const getFriends = async () => {
    const friends = await apiFetch(`/users/${userId}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const friendsList = await friends.json();
    setFriends(friendsList);
  };

  const getUser = async () => {
    const response = await apiFetch(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
    getFriends();
  }, [userId]);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (width > 640) {
        setIsCreatePostActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <>
      <div className=" sm:flex text-neutral-main gap-5 mt-8">
        <div className=" sm:block w-full mb-6 sm:w-1/3 md:w-1/4">
          <UserWidget
            user={user}
            // id={userId}
            // name={`${user?.firstName} ${user?.lastName}`}
            // picturePath={user?.picturePath}
          />
        </div>
        <div className="w-full sm:w-2/3 lg:2/4">
          <PostFeed userId={userId} isViewProfile={true} />
        </div>
        <div className="hidden lg:block w-1/4">
          <FriendsList userId={userId} friends={friends} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
