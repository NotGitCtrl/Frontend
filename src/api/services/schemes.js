import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllSchemes() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllSchemes, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addScheme(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addScheme, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateScheme(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateDistrict + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteScheme(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteDistrict + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllSchemes, addScheme, updateScheme, deleteScheme };
