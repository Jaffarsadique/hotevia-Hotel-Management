import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import HotelList from "./pages/HotelList";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import HotelDetails from "./pages/HotelDetails";
import SearchBar from "./components/SearchBar";
import { fetchHotels } from "./redux/hotelSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // get the hotels from the backend when the app opens
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const path = location.pathname;

  // banner heading changes depending on the page
  let pageTitle = "Hotels";
  if (path === "/hotels/new") {
    pageTitle = "Add hotel";
  } else if (path.endsWith("/edit")) {
    pageTitle = "Edit hotel";
  } else if (path.startsWith("/hotels/")) {
    pageTitle = "Hotel details";
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="wrap header-row">
          <Link to="/" className="logo">
            Hote<span>via</span>
          </Link>
          <SearchBar />
          <Link to="/hotels/new" className="btn outline">
            + Add hotel
          </Link>
        </div>
      </header>

      <div className="banner">
        <div className="wrap">
          <h1>{pageTitle}</h1>
          <p className="crumbs">
            <Link to="/">Home</Link> &gt; <Link to="/">Hotels</Link>
            {pageTitle !== "Hotels" && <span> &gt; <strong>{pageTitle}</strong></span>}
          </p>
        </div>
      </div>

      <main className="wrap main">
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotels/new" element={<AddHotel />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/hotels/:id/edit" element={<EditHotel />} />
          <Route path="*" element={<p>Sorry, that page does not exist. <Link to="/">Back to hotels</Link></p>} />
        </Routes>
      </main>

      <footer className="site-footer">© 2026 Hotevia. All rights reserved.</footer>
    </div>
  );
}

export default App;
