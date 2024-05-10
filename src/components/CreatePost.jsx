import React from "react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";

const CreatePost = ({ id, name, picturePath }) => {
  const token = useSelector((state) => state.auth.token);
  const [file, setFile] = useState(null);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    multiple: false,
    accept: ".jpg, .png, .jpeg",
  });
  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("picture", file);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setPost(data);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handlePost}>
        <div>
          <div className="flex justify-center items-center">
            <img
              className="h-[48px] w-[48px] rounded-full object-cover"
              src={`/api/assets/${picturePath}`}
              alt={name}
            />
          </div>
          <input type="text" name="description" />
        </div>
        <div className="w-full my-3 h-[1px] bg-neutral-mediumMain/50 " />
        <div></div>
      </form>
    </div>
  );
};

export default CreatePost;
