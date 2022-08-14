import { getStorage } from "../utils/localstorage-utils";

export default async function interceptor(endpoint, method = "GET", body = {}) {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  const contentType = "application/json";
  let token = getStorage("user_token");

  const reqOptions = {
    method,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  if (!token) {
    delete reqOptions.headers.Authorization;
  }

  if (!Object.keys(body).length || method.toLowerCase() === "get") {
    delete reqOptions.body;
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, reqOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
