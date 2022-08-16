import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllProjects() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllProjects, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addProject(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addProject, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateProject(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateProject + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteProject(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteProject + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllProjects, addProject, updateProject, deleteProject };
