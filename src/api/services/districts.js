import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllDistricts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllDistricts, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function showDistrict(body) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(body.id);
      API_endpoints.showState = API_endpoints.showState.replace(":id", body.id);
      console.log(API_endpoints.showState);
      const response = await interceptor(API_endpoints.showState, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addDistrict(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.addDistrict,
        "POST",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateState(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateState,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteState(body) {
  return new Promise(async (resolve, reject) => {
    try {
      API_endpoints.deleteState = API_endpoints.deleteState.replace(
        ":id",
        body.id
      );
      const response = await interceptor(
        API_endpoints.deleteState,
        "DELETE",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllDistricts, addDistrict, updateState, deleteState };
