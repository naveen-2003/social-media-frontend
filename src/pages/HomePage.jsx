import UserWidget from "../components/UserWidget";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Create } from "@mui/icons-material";
import CreatePost from "../components/CreatePost";

const HomePage = () => {
  const { id, name, picturePath } = useSelector((state) => state.auth.user);
  return (
    <>
      <Header />
      <div className="flex text-neutral-main gap-5 mt-8">
        <div className="w-1/4">
          <UserWidget id={id} name={name} picturePath={picturePath} />
        </div>
        <div className="w-2/4">
          <CreatePost id={id} name={name} picturePath={picturePath} />
        </div>
        <div className="w-1/4">Hello</div>
      </div>
    </>
  );
};

export default HomePage;
