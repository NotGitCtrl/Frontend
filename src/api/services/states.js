import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllStates() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllStates, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addState(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addState, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateState(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateState + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteState(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteState + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllStates, addState, updateState, deleteState };
