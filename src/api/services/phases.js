import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllPhases(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllPhases + "/" + id + "/list", "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addPhase(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addPhase, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updatePhase(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updatePhase + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deletePhase(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deletePhase + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllPhases, addPhase, updatePhase, deletePhase };
