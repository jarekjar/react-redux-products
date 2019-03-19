import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/businesses/";

export function getBusinesses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
