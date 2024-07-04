import ManageAccount from "../components/ManageAccount";
import Header from "../components/Header";
import React, { useState } from "react";
import ManageFriends from "../components/ManageFriends";

const Settings = () => {
  const [active, setActive] = useState(0);
  const list = [
    { name: "Account", component: <ManageAccount /> },
    { name: "Post", component: <div>Post page</div> },
    { name: "Friends", component: <ManageFriends/> },
  ];
  return (
    <div className="flex w-full text-neutral-main ">
      <div className="w-1/4">
        <div className="border-r border-white">
          {list.map((item, index) => (
            <div className="cursor-pointer" onClick={() => setActive(index)}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4">{list[active].component}</div>
    </div>
  );
};

export default Settings;
