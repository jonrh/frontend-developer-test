import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import MockAdapter from "axios-mock-adapter";

import users from "./demoUsers";
import { UserDecision } from "./Types";

// Feeld Developer Test API url to get 20 random users
const USERS_URL = "https://fld-devtest-api.herokuapp.com/api/v1/users";

// This URL doesn't exist, I just list it here for the sake of example
const DECISION_URL = "https://fld-devtest-api.herokuapp.com/api/v1/decision";

const SESSION_TOKEN =
  "3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=";

function getAxiosConfig(method: Method, url: string, data?: any): AxiosRequestConfig {
  return {
    method,
    url,
    data,
    timeout: 15 * 1000, // time in milliseconds
    headers: {
      "session-token": SESSION_TOKEN,
    },
  };
}

/**
 * Gets 20 random users (out of 100) from the Feeld developer test API.
 *
 * Note that the users returned are not unique. That means a response can contain the same user
 * object multiple times. I have for example seen a request that included the same user 3 times.
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
 * Potential improvements:
 *  + Improve the return types for the promise fulfilment. Currently Any, but it would be better
 *    if it were User[] or something along those lines.
 *
 */
export function get20Users() {
  const axiosConfig: AxiosRequestConfig = getAxiosConfig("get", USERS_URL);

  return axios(axiosConfig)
    .then(response => response.data.data)
    .catch(error => console.log(error));

  // When debugging, append local mock users first
  // return axios(axiosConfig)
  //   .then(response => {
  //     return [users[1], users[2], users[3], ...response.data.data];
  //   })
  //   .catch(error => console.log(error));
}

export function getLocalUsers() {
  const mock = new MockAdapter(axios);
  mock.onGet(USERS_URL).reply(200, {
    status: 200,
    data: users,
  });

  return get20Users();
}

/**
 * An example of a function that would submit to the Feeld API once a user has taken a
 * reject/skip/approve decision on another user. This is non-functional because the endpoint
 * doesn't exist.
 */
export function postUserDecision(userDecision: UserDecision) {
  const axiosConfig: AxiosRequestConfig = getAxiosConfig("post", DECISION_URL, userDecision);

  // Since there isn't an endpoint to submit user decisions we just fire and forget here.
  //return axios(axiosConfig);
}
