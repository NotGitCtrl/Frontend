import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllCountries() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllCountries, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addCountry(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.addCountry,
        "POST",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateCountry(body) {
  return new Promise(async (resolve, reject) => {
    try {
      API_endpoints.updateCountry = API_endpoints.updateCountry.replace(
        ":id",
        body.id
      );
      const response = await interceptor(API_endpoints.updateCountry, "PUT", {
        name: body.name,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteCountry(body) {
  return new Promise(async (resolve, reject) => {
    try {
      API_endpoints.deleteCountry = API_endpoints.deleteCountry.replace(
        ":id",
        body.id
      );
      const response = await interceptor(
        API_endpoints.deleteCountry,
        "DELETE",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllCountries, addCountry, updateCountry, deleteCountry };
