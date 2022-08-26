import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllProposals() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllProposals, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function getProposalDetails(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.getProposalDetails + "/" + id,
        "GET"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addProposal(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.addProposal,
        "POST",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateProposal(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.updateProposal + "/" + id,
        "PUT",
        body
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteProposal(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(
        API_endpoints.deleteProposal + "/" + id,
        "DELETE"
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export {
  getAllProposals,
  addProposal,
  updateProposal,
  deleteProposal,
  getProposalDetails,
};
