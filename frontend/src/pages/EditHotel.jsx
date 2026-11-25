import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HotelForm from "../components/HotelForm";
import { updateHotel } from "../redux/hotelSlice";

function EditHotel() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotel = useSelector((state) => state.hotels.list.find((h) => h.id === id));
  const status = useSelector((state) => state.hotels.status);
  const [serverError, setServerError] = useState("");

  if (status === "idle" || status === "loading") {
    return <p>Loading...</p>;
  }

  if (!hotel) {
    return <p>Hotel not found. <Link to="/">Back to hotels</Link></p>;
  }

  async function handleSubmit(hotelData) {
    try {
      await dispatch(updateHotel({ ...hotelData, id: hotel.id })).unwrap();
      navigate("/hotels/" + hotel.id);
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <div className="narrow">
      <Helmet>
        <title>{"Edit " + hotel.title + " | Hotevia"}</title>
      </Helmet>
      {serverError && <p className="error">{serverError}</p>}
      <HotelForm initialData={hotel} onSubmit={handleSubmit} buttonText="Save changes" />
    </div>
  );
}

export default EditHotel;
