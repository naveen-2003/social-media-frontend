import React, { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

// const temp = {
//   _id: "663df38d7b972ce1304a7baa",
//   firstName: "Naveen",
//   lastName: "N",
//   email: "nnaveen112233@gmail.com",
//   picturePath: "94a7bfaafec96fc49a45956fa1e7f5df.jpg",
//   friends: [],
//   location: "Cuddalore",
//   occupation: "Student",
//   viewedProfile: 6298,
//   impressions: 6700,
//   createdAt: "2024-05-10T10:14:37.071Z",
//   updatedAt: "2024-05-10T10:14:37.071Z",
//   __v: 0,
// };

const UserWidget = ({ id, name, picturePath }) => {
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUserData(data);
    // console.log(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="bg-background-alt px-5 py-5 rounded-xl text-sm ">
      <FlexBetween className="">
        <FlexBetween className="gap-2">
          <div className="flex justify-center items-center">
            <img
              className="h-[48px] w-[48px] rounded-full object-cover"
              src={`/api/assets/${picturePath}`}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
          </div>
          <div>
            <div className="font-semibold text-neutral-dark text-base">
              {name}
            </div>
            <div className="text-xs font-medium">
              {userData?.friends?.length} friends
            </div>
          </div>
        </FlexBetween>
        <FlexBetween className="text-neutral-dark">
          <ManageAccountsOutlined />
        </FlexBetween>
      </FlexBetween>
      <div className="w-full my-3 h-[1px] bg-neutral-mediumMain/50 " />
      <div>
        <div className="flex gap-2">
          <FlexBetween className="text-neutral-dark">
            <LocationOnOutlined fontSize="medium" />
          </FlexBetween>
          <div>{userData?.location}</div>
        </div>
        <div className="flex gap-2">
          <FlexBetween className="text-neutral-dark">
            <WorkOutlineOutlined fontSize="medium" />
          </FlexBetween>
          <div>{userData?.occupation}</div>
        </div>
      </div>
      <div className="w-full my-3 h-[2px] bg-neutral-mediumMain/50 " />
      <div>
        <FlexBetween>
          <div>Who's viewed your profile</div>
          <div className="text-neutral-dark text-sm">
            {userData?.viewedProfile}
          </div>
        </FlexBetween>
        <FlexBetween>
          <div>Impression of your post </div>
          <div className="text-neutral-dark text-sm ">
            {userData?.impressions}
          </div>
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
          <EditOutlined fontSize="small" />
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
          <EditOutlined fontSize="small" />
        </FlexBetween>
      </div>
    </div>
  );
};

export default UserWidget;
