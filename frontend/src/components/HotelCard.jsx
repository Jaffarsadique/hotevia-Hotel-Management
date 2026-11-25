import { Link } from "react-router-dom";

function HotelCard({ hotel, onDelete }) {
  return (
    <div className="card">
      <Link to={"/hotels/" + hotel.id} className="card-img">
        <img src={hotel.image} alt={hotel.title + " hotel"} />
      </Link>

      <div className="card-main">
        <h3>
          <Link to={"/hotels/" + hotel.id}>{hotel.title}</Link>
        </h3>
        <p className="coords">
          Lat {hotel.latitude}, Lng {hotel.longitude}
        </p>
        <p className="desc">{hotel.description}</p>
      </div>

      <div className="card-side">
        <p className="price">₹{Number(hotel.price).toLocaleString("en-IN")}</p>
        <p className="per">per night</p>
        <div className="card-actions">
          <Link className="btn sm" to={"/hotels/" + hotel.id}>Details</Link>
          <Link className="btn sm outline" to={"/hotels/" + hotel.id + "/edit"}>Edit</Link>
          <button className="btn sm danger" onClick={() => onDelete(hotel)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
