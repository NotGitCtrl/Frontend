import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getUniAdmins(role_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getUniAdmins, "POST", {
        role_id: "62eff434a3e25c1405599a44",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getUniAdmins };
