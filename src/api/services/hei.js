import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllHeis() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllHeis, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addHei(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addHei, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateHei(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateHei + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteHei(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteHei + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllHeis, addHei, updateHei, deleteHei };
