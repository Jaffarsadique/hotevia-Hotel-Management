import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  latitude: "",
  longitude: "",
  price: "",
  image: "",
};

// used by both the Add and Edit pages
function HotelForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Please choose an image file" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image must be smaller than 2MB" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      setErrors({ ...errors, image: "" });
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const newErrors = {};

    if (formData.title.trim() === "") {
      newErrors.title = "Title is required";
    }
    if (formData.description.trim() === "") {
      newErrors.description = "Description is required";
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    const lat = Number(formData.latitude);
    if (formData.latitude === "" || isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    const lng = Number(formData.longitude);
    if (formData.longitude === "" || isNaN(lng) || lng < -180 || lng > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    if (formData.price === "" || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      price: Number(formData.price),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="image">Image</label>
        <input id="image" type="file" accept="image/*" onChange={handleImage} />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>

      {formData.image && (
        <img className="preview" src={formData.image} alt="Selected hotel preview" />
      )}

      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="latitude">Latitude</label>
          <input id="latitude" name="latitude" type="number" step="any" value={formData.latitude} onChange={handleChange} />
          {errors.latitude && <span className="error">{errors.latitude}</span>}
        </div>
        <div className="field">
          <label htmlFor="longitude">Longitude</label>
          <input id="longitude" name="longitude" type="number" step="any" value={formData.longitude} onChange={handleChange} />
          {errors.longitude && <span className="error">{errors.longitude}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="price">Price per night (₹)</label>
        <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <button type="submit" className="btn">{buttonText}</button>
    </form>
  );
}

export default HotelForm;
