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

function getProjectDetails(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.getProjectDetails + "/" + id,
        "GET"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function getProjectDetailsRabbit(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.getProjectDetails + "/" + id + "/getProjects",
        "GET"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}


function approveProject(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.getProjectDetails + "/" + id + "/approve",
        "POST"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addProject(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.addProject,
        "POST",
        body
      );
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

export {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getProjectDetails,
  getProjectDetailsRabbit,
  approveProject
};
