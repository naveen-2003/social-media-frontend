import { useState } from "react";

const customInput = ({
  className: style,
  formData,
  handleChange,
  ...inputProperties
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`${style} relative h-10 grid grid-flow-row grid-cols-4 gap-x-40 px-4 border rounded-md ${
        formData[inputProperties.name] !== undefined || isActive
          ? "border-primary-main"
          : "border-neutral-medium/95"
      } my-2`}
    >
      <input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={handleChange}
        className="absolute rounded-md bg-transparent w-full top-0 bottom-0 px-4  select-none outline-none z-[1111] "
        {...inputProperties}
      />
      <div
        className={`absolute bottom-0 top-0 flex items-center ease-in-out transition-all ${
          formData[inputProperties.name] !== undefined || isActive
            ? "-translate-y-5  scale-[.8]"
            : ""
        }`}
      >
        <div
          className={`px-3 bg-background-alt text-sm ${
            formData[inputProperties.name] !== undefined || isActive
              ? "text-primary-main"
              : "text-neutral-medium"
          }`}
        >
          {inputProperties.label}
        </div>
      </div>
    </div>
  );
};

export default customInput;
