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

function editState(body) {
  return new Promise(async (resolve, reject) => {
    try {
      API_endpoints.editState = API_endpoints.editState.replace(":id", body.id);
      const response = await interceptor(API_endpoints.editState, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function showState(body) {
  return new Promise(async (resolve, reject) => {
    try {
      API_endpoints.showState = API_endpoints.showState.replace(":id", body.id);
      const response = await interceptor(API_endpoints.showState, "GET");
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

function updateState(body) {
  return new Promise(async (resolve, reject) => {
    API_endpoints.updateState = API_endpoints.updateState.replace(
      ":id",
      body.id
    );
    try {
      const response = await interceptor(API_endpoints.updateState, "PUT", {
        country_id: body.country,
        name: body.name,
      });
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

export {
  getAllStates,
  addState,
  updateState,
  deleteState,
  editState,
  showState,
};
