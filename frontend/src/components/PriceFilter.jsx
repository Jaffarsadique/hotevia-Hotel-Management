import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter, resetFilters } from "../redux/hotelSlice";

function PriceFilter() {
  const dispatch = useDispatch();
  const minPrice = useSelector((state) => state.hotels.minPrice);
  const maxPrice = useSelector((state) => state.hotels.maxPrice);

  // keep what the user types here until they press Apply
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  function handleApply() {
    dispatch(setPriceFilter({ minPrice: min, maxPrice: max }));
  }

  function handleReset() {
    setMin("");
    setMax("");
    dispatch(resetFilters());
  }

  return (
    <div className="filter-box">
      <h2>Price</h2>
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        value={max === "" ? 10000 : max}
        onChange={(e) => setMax(e.target.value)}
        aria-label="Maximum price"
      />
      <div className="minmax">
        <label>
          Min
          <input type="number" min="0" placeholder="0" value={min} onChange={(e) => setMin(e.target.value)} />
        </label>
        <label>
          Max
          <input type="number" min="0" placeholder="10000" value={max} onChange={(e) => setMax(e.target.value)} />
        </label>
      </div>
      <button className="btn outline block" onClick={handleApply}>Apply</button>
      <button className="reset" onClick={handleReset}>Clear filters</button>
    </div>
  );
}

export default PriceFilter;
