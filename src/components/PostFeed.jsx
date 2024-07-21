import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { setFriends, setPosts } from "../store/authSlice";
import { apiFetch } from "../utils/apiFetch";

const PostFeed = ({ userId, isViewProfile = false }) => {
  const posts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [postModified, setPostModified] = useState(false);
  const [page, setPage] = useState(0);
  const getPosts = async () => {
    const response = await apiFetch(
      isViewProfile
        ? `/posts/${userId}/posts?page=${page}`
        : `/posts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.length === 0) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }
    if (page === 0) {
      // console.log(JSON.stringify(posts));
      // console.log(JSON.stringify(data));
      if (JSON.stringify(posts) !== JSON.stringify(data)) {
        dispatch(setPosts({ posts: data }));
      }
    } else {
      dispatch(setPosts({ posts: [...posts, ...data] }));
    }
  };

  useEffect(() => {
    getPosts();
  }, [page, userId, postModified]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <div>
      {posts?.map((post, index) => (
        <Post key={index} post={post} setPostModified={setPostModified} />
      ))}
    </div>
  );
};

export default PostFeed;
