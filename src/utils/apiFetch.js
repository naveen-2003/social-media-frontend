export const apiFetch = async (url, options) => {
  url = "https://social-media-backend-8qt2.onrender.com" + url;
  return fetch(url, options);
};
