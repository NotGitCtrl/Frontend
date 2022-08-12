import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllFAs() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllFAs, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addFA(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addFA, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateFA(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateFA + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteFA(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteFA + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllFAs, addFA, updateFA, deleteFA };
