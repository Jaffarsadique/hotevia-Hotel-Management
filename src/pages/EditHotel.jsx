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

  if (!hotel) {
    return <p>Hotel not found. <Link to="/">Back to hotels</Link></p>;
  }

  function handleSubmit(hotelData) {
    dispatch(updateHotel({ ...hotelData, id: hotel.id }));
    navigate("/hotels/" + hotel.id);
  }

  return (
    <div className="narrow">
      <Helmet>
        <title>{"Edit " + hotel.title + " | Hotevia"}</title>
      </Helmet>
      <HotelForm initialData={hotel} onSubmit={handleSubmit} buttonText="Save changes" />
    </div>
  );
}

export default EditHotel;
