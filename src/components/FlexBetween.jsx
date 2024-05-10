import React from "react";

const FlexBetween = (props) => {
  return (
    <div className={`${props.className} flex justify-between items-center`}>
      {props.children}
    </div>
  );
};

export default FlexBetween;
