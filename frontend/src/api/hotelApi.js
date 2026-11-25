// all calls to the backend live here
// in dev, vite forwards /api to the backend (see vite.config.js)
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options) {
  let response;
  try {
    response = await fetch(BASE_URL + path, options);
  } catch (err) {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  if (!response.ok) {
    let message = "Something went wrong";
    try {
      const body = await response.json();
      if (body.message) message = body.message;
    } catch (err) {
      // response had no json body, keep the default message
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

function jsonOptions(method, data) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

export function getHotels() {
  return request("/hotels");
}

export function createHotel(hotel) {
  return request("/hotels", jsonOptions("POST", hotel));
}

export function editHotel(hotel) {
  return request("/hotels/" + hotel.id, jsonOptions("PUT", hotel));
}

export function removeHotel(id) {
  return request("/hotels/" + id, { method: "DELETE" });
}
