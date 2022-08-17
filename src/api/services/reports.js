import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllReports() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllReports, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addReport(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addReport, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateReport(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateReport + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteReport(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteReport + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllReports, addReport, updateReport, deleteReport };
