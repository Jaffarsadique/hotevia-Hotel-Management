// returns an object of errors, empty object means the data is fine
export default function validateHotel(data) {
  const errors = {};

  if (typeof data.title !== "string" || data.title.trim() === "") {
    errors.title = "Title is required";
  }
  if (typeof data.description !== "string" || data.description.trim() === "") {
    errors.description = "Description is required";
  }
  if (typeof data.image !== "string" || data.image === "") {
    errors.image = "Image is required";
  }

  const lat = Number(data.latitude);
  if (data.latitude === "" || data.latitude == null || isNaN(lat) || lat < -90 || lat > 90) {
    errors.latitude = "Latitude must be between -90 and 90";
  }

  const lng = Number(data.longitude);
  if (data.longitude === "" || data.longitude == null || isNaN(lng) || lng < -180 || lng > 180) {
    errors.longitude = "Longitude must be between -180 and 180";
  }

  const price = Number(data.price);
  if (data.price === "" || data.price == null || isNaN(price) || price <= 0) {
    errors.price = "Price must be greater than 0";
  }

  return errors;
}
