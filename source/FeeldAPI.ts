import axios, { AxiosRequestConfig } from "axios";

const SESSION_TOKEN =
  "3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=";

/**
 * Gets 20 random users (out of 100) from the Feeld developer test API.
 *
 * After a bit of testing here are few responses that I've seen. Of note is that the the status
 * attribute is "status" on successful requests but "statusCode" on unsuccessful one.
 *
 * Response with a successful response:
 *
 * {
 *    "status": 200
 *    "data": [...] // List of user objects
 * }
 *
 * Unauthorized response:
 *
 * {
 *    "statusCode": 401,
 *    "error": "Unauthorized",
 *    "message": "You cannot access this resource"
 * }
 *
 * Resource not found response:
 *
 * {
 *    "statusCode": 404,
 *    "error": "Not Found",
 *    "message": "Not Found"
 * }
 *
 */
export function get20Users() {
  const axiosConfig: AxiosRequestConfig = {
    method: "get",
    url: "https://fld-devtest-api.herokuapp.com/api/v1/users",
    headers: {
      "session-token": SESSION_TOKEN,
    },
  };

  return axios(axiosConfig)
    .then(results => results.data.data)
    .catch(error => console.log(error));
}
