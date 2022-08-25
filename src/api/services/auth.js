import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function loginUser(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.loginUser, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function registerUser(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.registerUser,
        "POST",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function showUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.showUser, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { loginUser, registerUser, showUser };
