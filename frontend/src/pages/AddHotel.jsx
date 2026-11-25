import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HotelForm from "../components/HotelForm";
import { addHotel } from "../redux/hotelSlice";

function AddHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  async function handleSubmit(hotelData) {
    try {
      await dispatch(addHotel(hotelData)).unwrap();
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <div className="narrow">
      <Helmet>
        <title>Add Hotel | Hotevia</title>
      </Helmet>
      {serverError && <p className="error">{serverError}</p>}
      <HotelForm onSubmit={handleSubmit} buttonText="Add hotel" />
    </div>
  );
}

export default AddHotel;
