export const apiFetch = async (url, options) => {
  url = "https://profinsta-backend.netlify.app" + url;
  // url = "http://localhost:3001" + url;
  return await fetch(url, options);
};
