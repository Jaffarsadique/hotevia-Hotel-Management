import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import HotelCard from "../components/HotelCard";
import PriceFilter from "../components/PriceFilter";
import Pagination from "../components/Pagination";
import { deleteHotel, setSortBy, setViewMode, setCurrentPage } from "../redux/hotelSlice";

const HOTELS_PER_PAGE = 5;

function HotelList() {
  const dispatch = useDispatch();
  const { list, status, error, search, minPrice, maxPrice, sortBy, viewMode, currentPage } = useSelector(
    (state) => state.hotels
  );

  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [result, setResult] = useState(null); // message shown after a delete

  // filter by title and price
  let filtered = list.filter((hotel) => {
    if (!hotel.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
    if (minPrice !== "" && hotel.price < Number(minPrice)) return false;
    if (maxPrice !== "" && hotel.price > Number(maxPrice)) return false;
    return true;
  });

  // sort a copy so the store is not changed
  filtered = [...filtered];
  if (sortBy === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / HOTELS_PER_PAGE));
  const page = Math.min(currentPage, totalPages); // in case the last item of a page was deleted
  const start = (page - 1) * HOTELS_PER_PAGE;
  const hotelsOnPage = filtered.slice(start, start + HOTELS_PER_PAGE);

  async function handleConfirmDelete() {
    try {
      await dispatch(deleteHotel(hotelToDelete.id)).unwrap();
      setResult({ title: "Deleted", text: "Hotel deleted successfully." });
    } catch (err) {
      setResult({ title: "Error", text: err.message });
    }
    setHotelToDelete(null);
  }

  return (
    <div className="layout">
      <Helmet>
        <title>Hotels | Hotevia</title>
        <meta name="description" content="Browse, search and manage hotels on Hotevia." />
      </Helmet>

      <aside className="sidebar">
        <PriceFilter />
      </aside>

      <section>
        <div className="toolbar">
          <strong>{status === "done" ? filtered.length + " hotels found" : "Hotels"}</strong>
          <div className="toolbar-right">
            <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))} aria-label="Sort by">
              <option value="best">Best match</option>
              <option value="priceLow">Price: low to high</option>
              <option value="priceHigh">Price: high to low</option>
              <option value="title">Title A-Z</option>
            </select>
            <div className="toggle">
              <button className={viewMode === "list" ? "on" : ""} onClick={() => dispatch(setViewMode("list"))}>List</button>
              <button className={viewMode === "grid" ? "on" : ""} onClick={() => dispatch(setViewMode("grid"))}>Grid</button>
            </div>
          </div>
        </div>

        {status === "loading" || status === "idle" ? (
          <p className="empty">Loading hotels...</p>
        ) : status === "failed" ? (
          <p className="empty">{error}</p>
        ) : hotelsOnPage.length === 0 ? (
          <p className="empty">No hotels found. Try a different title or price range.</p>
        ) : (
          <div className={viewMode === "grid" ? "cards grid" : "cards"}>
            {hotelsOnPage.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} onDelete={setHotelToDelete} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => dispatch(setCurrentPage(p))}
        />
      </section>

      {hotelToDelete && (
        <div className="backdrop">
          <div className="modal">
            <h2>Delete hotel?</h2>
            <p>Are you sure you want to delete {hotelToDelete.title}?</p>
            <div className="card-actions">
              <button className="btn danger" onClick={handleConfirmDelete}>Delete</button>
              <button className="btn outline" onClick={() => setHotelToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="backdrop">
          <div className="modal">
            <h2>{result.title}</h2>
            <p>{result.text}</p>
            <button className="btn" onClick={() => setResult(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelList;
