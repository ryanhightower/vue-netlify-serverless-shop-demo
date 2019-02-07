import axios from "axios";

const baseUrl = `https://us-central1-yours-app-ea7c8.cloudfunctions.net`;
const api = axios.create({
  baseURL: baseUrl,
  validateStatus: status => status >= 200 && status < 500
});

export function handler(event, context, callback) {
  api
    .get("/users/gSovgFYEIlMRGPjnynEOM7sir4H2/movies/-LQ2uTgBqpgtedgcXS1z")
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ movie: res.data })
      });
    });
}
