import axios from "axios";
export const baseURL = "https://delman-fe-api.fly.dev/";

export const API = axios.create({
  baseURL,
});

const configPost = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

const configDelete = {
  method: "DELETE",
};

export async function getSales() {
  const response = await API.get("/");
  return response.data.data;
}

export async function getUsers() {
  const response = await API.get("/users");
  return response.data.data;
}

export async function postUser(form) {
  const body = JSON.stringify(form);
  const response = await API.post("/users", body, configPost);
  return response.data;
}

export async function deleteUser(id) {
  const response = await API.delete(`/users/${id}`, configDelete);
  return response.data;
}
