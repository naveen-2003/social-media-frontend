import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const CustomInput = ({
  className: style,
  formData,
  handleChange,
  ...inputProperties
}) => {
  const [isActive, setIsActive] = useState(false);
  const [visibility, setVisibility] = useState(false);
  return (
    <div
      className={`${style} custom-input relative  h-10 grid grid-flow-row grid-cols-4 gap-x-40 px-4 border rounded-md ${
        formData[inputProperties.name] || isActive
          ? "border-primary-main"
          : "border-neutral-medium/95"
      } my-2`}
    >
      <input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={handleChange}
        value={formData[inputProperties.name] || ""}
        className="absolute rounded-md bg-transparent w-full top-0 bottom-0 px-4  select-none outline-none z-[1111] "
        {...inputProperties}
        type={
          inputProperties?.type === "password"
            ? visibility
              ? "text"
              : "password"
            : inputProperties.type
        }
      />
      <div
        className={`absolute bottom-0 top-0 flex items-center ease-in-out transition-all ${
          formData[inputProperties.name] || isActive
            ? "-translate-y-5  scale-[.8]"
            : ""
        }`}
      >
        <div
          className={`px-3 input-label  text-sm ${
            formData[inputProperties.name] || isActive
              ? "text-primary-main"
              : "text-neutral-medium"
          }`}
        >
          {inputProperties.label}
        </div>
      </div>
      {inputProperties?.type === "password" &&
        formData[inputProperties.name] && (
          <div
            className="cursor-pointer absolute right-2 top-0 bottom-0 opacity-20 hover:opacity-50 z-[2222] flex items-center"
            onClick={() => {
              setVisibility(!visibility);
            }}
          >
            {visibility ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </div>
        )}
    </div>
  );
};

export default CustomInput;
