import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllTransactions() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.getAllTransactions,
        "GET"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addTransaction(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.addTransaction,
        "POST",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateTransaction(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateTransaction + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteTransaction(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteTransaction + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
