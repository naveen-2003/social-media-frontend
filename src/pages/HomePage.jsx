import UserWidget from "../components/UserWidget";
import FlexBetween from "../components/FlexBetween";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "../components/CreatePost";
import PostFeed from "../components/PostFeed";
import FriendsList from "../components/FriendsList";
import { IconButton, Tooltip } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";

const HomePage = () => {
  const [user, setUser] = useState({});
  const { id, name, picturePath, friends } = useSelector(
    (state) => state.auth.user
  );
  const token = useSelector((state) => state.auth.token);
  const getUser = async () => {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
    // console.log(data);
  };
  useEffect(() => {
    getUser();
  }, [id]);

  const [isCreatePostActive, setIsCreatePostActive] = useState(false);
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
      <div className=" flex text-neutral-main gap-5 mt-8">
        <div className="hidden sm:block w-1/3 md:w-1/4">
          <UserWidget
            user={user}
            // id={id}
            // name={name}
            // picturePath={picturePath}
          />
        </div>
        <div className="w-full sm:w-2/3 lg:2/4">
          <div
            onClick={() => setIsCreatePostActive(!isCreatePostActive)}
            className={`${
              isCreatePostActive
                ? "fixed left-0 right-0  bottom-0 top-0 px-5 flex justify-center items-center w-screen h-screen bg-black/80"
                : "hidden sm:block"
            }`}
          >
            <CreatePost id={id} name={name} picturePath={picturePath} />
          </div>
          <PostFeed userId={id} />
        </div>
        <div className="hidden lg:block w-1/4">
          <FriendsList userId={id} friends={friends} />
        </div>
        <div className=" sm:hidden fixed bottom-0 right-0 ">
          <Tooltip
            title={isCreatePostActive ? "Close" : "Create Post"}
            placement="left"
            className=""
            arrow
          >
            <IconButton
              onClick={() => {
                setIsCreatePostActive(!isCreatePostActive);
              }}
            >
              {isCreatePostActive ? (
                <Cancel
                  className="text-primary-main"
                  sx={{ fontSize: "46px" }}
                />
              ) : (
                <AddCircle
                  className="text-primary-main"
                  sx={{ fontSize: "46px" }}
                />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default HomePage;
