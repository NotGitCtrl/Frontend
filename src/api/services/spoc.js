import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllSpoc() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllSpoc, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addSpoc(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addSpoc, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateSpoc(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateSpoc + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteSpoc(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteSpoc + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllSpoc, addSpoc, updateSpoc, deleteSpoc };
