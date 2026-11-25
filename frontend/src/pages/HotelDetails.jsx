import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function HotelDetails() {
  const { id } = useParams();
  const hotel = useSelector((state) => state.hotels.list.find((h) => h.id === id));
  const status = useSelector((state) => state.hotels.status);

  if (status === "idle" || status === "loading") {
    return <p>Loading...</p>;
  }

  if (!hotel) {
    return <p>Hotel not found. <Link to="/">Back to hotels</Link></p>;
  }

  // small box around the hotel so the map zooms in on it
  const lat = hotel.latitude;
  const lng = hotel.longitude;
  const offset = 0.01;
  const mapUrl =
    "https://www.openstreetmap.org/export/embed.html?bbox=" +
    (lng - offset) + "," + (lat - offset) + "," + (lng + offset) + "," + (lat + offset) +
    "&layer=mapnik&marker=" + lat + "," + lng;

  return (
    <div className="details">
      <Helmet>
        <title>{hotel.title + " | Hotevia"}</title>
        <meta name="description" content={hotel.description.slice(0, 150)} />
      </Helmet>

      <Link to="/">&laquo; Back to hotels</Link>
      <img src={hotel.image} alt={hotel.title + " hotel"} />

      <div className="details-head">
        <h1>{hotel.title}</h1>
        <p className="price">₹{Number(hotel.price).toLocaleString("en-IN")} <small>per night</small></p>
      </div>

      <p>{hotel.description}</p>
      <p className="muted">Coordinates: {lat}, {lng}</p>

      <iframe title={"Map of " + hotel.title} src={mapUrl} loading="lazy"></iframe>

      <div>
        <Link className="btn" to={"/hotels/" + hotel.id + "/edit"}>Edit hotel</Link>
      </div>
    </div>
  );
}

export default HotelDetails;
