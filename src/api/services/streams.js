import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllStreams() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllStreams, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addStream(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addStream, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateStream(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateStream + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteStream(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteStream + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllStreams, addStream, updateStream, deleteStream };
