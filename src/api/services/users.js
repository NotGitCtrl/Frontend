import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getUniAdmins(role_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getUniAdmins, "POST", {
        role_id: "62fa61d822030e523a57abef",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function getHeiAdmins(role_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getHeiAdmins, "POST", {
        role_id: "62fa61d822030e523a57abec",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function getFAAdmins(role_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getFAAdmins, "POST", {
        role_id: "62fa61d822030e523a57abea",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getUniAdmins, getHeiAdmins, getFAAdmins };
