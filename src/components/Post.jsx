import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Friend from "./Friend";
import { setPost, removePost } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Favorite,
  FavoriteBorder,
  AddComment,
  Send,
  Delete,
  MoreHoriz,
  WidthFull,
} from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/base";
import { IconButton, ClickAwayListener } from "@mui/material";
import { useAlert } from "./AlertContext";

const Post = ({ post, setPostModified }) => {
  if (!post) return null;
  const id = useSelector((state) => state.auth.user.id);
  const [isLiked, setIsLiked] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { showAlert } = useAlert();
  const deletePost = async () => {
    setIsMenuActive(false);
    const response = await fetch(`/api/posts/${post?._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // if ((await response).status === 202) {
    if (response.ok) {
      console.log("Post deleted");
      const data = await response.json();
      showAlert(data.msg, "success");
      dispatch(removePost({ post_id: post._id }));
      setPostModified(true);
    }
  };
  const editPost = async () => {
    console.log("Edit post");
  };

  const handleLike = async () => {
    const response = await fetch(`/api/posts/${post?._id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setPost({ post: data, post_id: post._id }));
      setIsLiked(data.likes[id]);
    }
  };

  const handleComment = async () => {
    const response = await fetch(`/api/posts/${post?._id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    });
    if (response.ok) {
      setComment("");
      const data = await response.json();
      dispatch(setPost({ post: data, post_id: post._id }));
    }
  };

  const deleteComment = async ({ comment, commentedUser }) => {
    const response = await fetch(`/api/posts/${post?._id}/comment/`, {
      method: "DELETE",
      body: JSON.stringify({ comment, commentedUser }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setPost({ post: data, post_id: post._id }));
    }
  };
  const [isMenuActive, setIsMenuActive] = useState(false);
  useEffect(() => {
    setIsLiked(post?.likes[id]);
  }, [isLiked, post]);

  return (
    <div className="bg-background-alt px-5 py-5 rounded-xl text-sm mb-5">
      <div
        className={`flex relative justify-between ${
          id !== post?.userId && "*:w-full"
        }`}
      >
        <Friend
          friendId={post?.userId}
          name={post?.firstName + " " + post?.lastName}
          userPicturePath={post?.userPicturePath}
          location={post?.location}
        />
        {id === post?.userId && (
          <div>
            <IconButton
              onClick={() => setIsMenuActive(!isMenuActive)}
              color="inherit"
            >
              <MoreHoriz fontSize="medium" />
            </IconButton>
            <div>
              {isMenuActive && (
                <ClickAwayListener onClickAway={() => setIsMenuActive(false)}>
                  <Menu className="absolute right-0 bg-neutral-light text-neutral-dark font-light rounded-md">
                    <MenuItem
                      onClick={editPost}
                      className="px-3 py-1 hover:bg-neutral-medium rounded-t-md"
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={deletePost}
                      className="px-3 py-1 hover:bg-neutral-medium rounded-b-md"
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </ClickAwayListener>
              )}
            </div>
          </div>
        )}
      </div>
      <pre className="text-neutral-dark py-3 text-wrap">
        {post?.description}
      </pre>
      {post?.fileType && post.fileType === "image" ? (
        <img
          loading="lazy"
          className="w-full rounded-xl"
          src={post?.picturePath}
          alt={`${post?.firstName} ${post?.lastName}`}
        />
      ) : post?.fileType === "video" ? (
        <video className="w-full rounded-xl" src={post?.picturePath} controls />
      ) : post?.fileType === "audio" ? (
        <audio className="w-full rounded-xl" src={post?.picturePath} controls />
      ) : null}
      <div className="flex gap-2 items-center mt-3">
        <div className="flex items-center" onClick={handleLike}>
          {isLiked ? (
            <Favorite className="text-pink-700" fontSize="medium" />
          ) : (
            <FavoriteBorder fontSize="medium" />
          )}
          <span className="ml-1">{Object.keys(post?.likes).length}</span>
        </div>
      </div>
      <div className="flex items-end w-full">
        <textarea
          placeholder="Add a comment..."
          style={{ fieldSizing: "content" }}
          className={`bg-transparent ${
            comment && "border-b"
          } border-primary-main text-neutral-mediumMain w-full mt-1 select-none outline-none resize-none content`}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
          type="text"
          name="comment"
        />
        {comment && (
          <Send
            onClick={handleComment}
            className="text-primary-main"
            fontSize="small"
          />
        )}
      </div>
      <div className="mt-2">
        {post?.comments.map((comment, index) => {
          return (
            <div
              key={post._id + "_" + index}
              className="mb-3 relative comment-container [&:hover_.delete-comment]:visible"
            >
              <div className="flex gap-2 mb-1">
                {/* <img
                  className="w-5 h-5 rounded-full"
                  src={comment.userPicturePath}
                  alt={comment.fullName}
                /> */}
                <div
                  onClick={() => {
                    navigate(`/profile/${comment.userId}`);
                  }}
                  className="text-neutral-dark text-sm font-medium cursor-pointer"
                >
                  {comment.fullName}
                </div>
              </div>
              <div className="text-sm flex justify-between">
                <div>{comment.comment}</div>
                {comment.userId === id && (
                  <div className="delete-comment invisible cursor-pointer">
                    <Delete
                      className=""
                      onClick={() => {
                        deleteComment({
                          comment: comment.comment,
                          commentedUser: comment.userId,
                        });
                      }}
                      fontSize="small"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
