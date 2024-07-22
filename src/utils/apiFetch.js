export const apiFetch = async (url, options) => {
  url = "https://social-media-backend-8qt2.onrender.com" + url;
  // url = "http://localhost:3001" + url;
  return await fetch(url, options);
};
