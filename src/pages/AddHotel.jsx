import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HotelForm from "../components/HotelForm";
import { addHotel } from "../redux/hotelSlice";

function AddHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(hotelData) {
    dispatch(addHotel(hotelData));
    navigate("/");
  }

  return (
    <div className="narrow">
      <Helmet>
        <title>Add Hotel | Hotevia</title>
      </Helmet>
      <HotelForm onSubmit={handleSubmit} buttonText="Add hotel" />
    </div>
  );
}

export default AddHotel;
