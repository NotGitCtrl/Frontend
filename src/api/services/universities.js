import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllUniversities() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.getAllUniversities,
        "GET"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addUniversity(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.addUniversity,
        "POST",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateUniversity(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateUniversity + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteUniversity(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteUniversity + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export {
  getAllUniversities,
  addUniversity,
  updateUniversity,
  deleteUniversity,
};
