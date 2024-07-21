import React, { useState } from "react";
import ManageAccount from "../components/ManageAccount";
import ManagePassword from "../components/ManagePassword";
import ManageProfile from "../components/ManageProfile";

const Settings = () => {
  const [active, setActive] = useState(0);
  const list = [
    { name: "Manage Profile", component: <ManageProfile /> },
    { name: "Manage Password", component: <ManagePassword /> },
    { name: "Manage Account", component: <ManageAccount /> },
  ];
  return (
    <div className="flex sm:flex-row  flex-col text flex-grow  gap-4 w-full h-full text-neutral-main mt-8 ">
      <div className="sm:w-1/4 max-w- min-h-full">
        <div className={`flex text-[12px] sm:block`}>
          {list.map((item, index) => (
            <div
              key={item.name}
              className={`${
                active === index && "bg-neutral-light text-neutral-dark"
              }  cursor-pointer px-3 py-3`}
              onClick={() => setActive(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden sm:block w-[2px] rounded-full bg-neutral-main mb-8"></div>
      <div className="sm:w-3/4 min-h-full flex flex-grow justify-center pb-8">
        {list[active].component}
      </div>
    </div>
  );
};

export default Settings;
