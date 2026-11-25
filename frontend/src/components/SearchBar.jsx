import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../redux/hotelSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.hotels.search);

  function handleChange(e) {
    dispatch(setSearch(e.target.value));
    navigate("/"); // search results are shown on the list page
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search hotels by title"
        aria-label="Search hotels by title"
        value={search}
        onChange={handleChange}
      />
      <button type="button" className="searchbar-btn" aria-label="Search">Go</button>
    </div>
  );
}

export default SearchBar;
