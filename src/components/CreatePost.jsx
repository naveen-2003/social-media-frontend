import React from "react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/authSlice";
import {
  ImageOutlined,
  VideoFileOutlined,
  AttachmentOutlined,
  MicOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useAlert } from "./AlertContext";
import { apiFetch } from "../utils/apiFetch";

const CreatePost = ({ id, name, picturePath }) => {
  const { showAlert } = useAlert();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [includeFile, setInclueFile] = useState(false);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    multiple: false,
    // accept: ".jpg, .png, .jpeg",
  });
  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (file) {
      formData.append("file", file);
    }
    const response = await apiFetch(`/posts`, {
      method: "POST",
      body: file
        ? formData
        : JSON.stringify({ description: formData.get("description") }),
      headers: {
        ...(!file && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    showAlert("Post created successfully", "success");
    setFile(null);
    e.target.reset();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-full px-5 py-5 bg-background-alt rounded-xl mb-5"
    >
      <form data-netlify="true" onSubmit={handlePost}>
        <div className="flex gap-5">
          <FlexBetween>
            <img
              className="h-[48px] w-[48px] max-w-none rounded-full object-cover"
              src={picturePath}
              alt={name}
            />
          </FlexBetween>
          <textarea
            name="description"
            placeholder="What's on your mind?"
            style={{ fieldSizing: "content" }}
            className="post-input-field w-full  max-h-[200px] pt-3 pb-3 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl rounded-br-3xl px-5 bg-neutral-light text-neutral-dark outline-none resize-none select-none"
          ></textarea>
        </div>
        {includeFile && (
          <div className="col-span-4 border rounded-md border-neutral-mediumMain/95 cursor-pointer mt-3">
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-neutral-dark">Drop the files here ...</p>
              ) : file ? (
                <div>
                  <p>{file.name}</p>
                </div>
              ) : (
                <p className="text-neutral-dark/50 text-sm px-3 py-2 ">
                  Drag 'n' drop some files here, or click to select files
                </p>
              )}
            </div>
          </div>
        )}
        <div className="w-full my-3 h-[1px] bg-neutral-mediumMain/50 " />
        <FlexBetween className="text-neutral-dark">
          <div className="flex gap-5">
            {/* <div
              onClick={() => {
                if (includeFile) {
                  setFile(null);
                  setInclueFile(false);
                } else setInclueFile(true);
              }}
              className="cursor-pointer"
            >
              <ImageOutlined fontSize="small" /> Image
            </div>
            <div
              onClick={() => {
                if (includeFile) {
                  setFile(null);
                  setInclueFile(false);
                } else setInclueFile(true);
              }}
              className="cursor-pointer"
            >
              <VideoFileOutlined fontSize="small" /> Video
            </div> */}
            <div
              onClick={() => {
                if (includeFile) {
                  setFile(null);
                  setInclueFile(false);
                } else setInclueFile(true);
              }}
              className="cursor-pointer"
            >
              <AttachmentOutlined fontSize="small" className="-rotate-90" />{" "}
              Attachment
            </div>
            {/* <div
              onClick={() => {
                if (includeFile) {
                  setFile(null);
                  setInclueFile(false);
                } else setInclueFile(true);
              }}
              className="cursor-pointer"
            >
              <MicOutlined fontSize="small" /> Audio
            </div> */}
          </div>
          <button className="bg-primary-main text-neutral-dark/80 font-medium text-sm rounded-l-full rounded-r-full px-3 py-2">
            POST
          </button>
        </FlexBetween>
      </form>
    </div>
  );
};

export default CreatePost;
