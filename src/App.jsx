import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./Components/GetStarted";
import Home from "./Components/Home";
import Nutrition from "./Components/Nutrition";
import Eshop from "./Components/Eshop";
import Offers from "./Components/Offers";
import Aboutus from "./Components/Aboutus";
import CartPage from "./Components/CartPage";
import AllDayDelights from "./Components/AllDayDelights";
import Sweet from "./Components/Sweet";
import Menu from "./Components/Menu";
import Favorites from "./Components/Favorites";
import Previous from "./Components/Previous";
import Search from "./Components/Search";
import Orderplace from "./Components/Orderplace";
import Rateus from "./Components/Rateus";
import Payment from "./Components/Payment";
import ContactUs from "./Components/ContactUs";

import axios from "axios";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // ✅ Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Sync cart with backend on login
  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3001/getCart", {
          params: { user: user.email },
        });
        setCart(res.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user]);

  // ✅ Add to Cart with Backend Sync
  const addToCart = async (item) => {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/addToCart", {
        user: user.email,
        item,
      });
      setCart(res.data.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Sync favorites with backend on login
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:3001/getfavorites", {
          params: { user: user.email },
        });
        setFavorites(res.data || []);
      } catch (err) {
        console.log("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  // ✅ Update favorites in local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Toggle Favorite Item
  const toggleFavorite = async (item) => {
    console.log("Toggling favorite for:", item);
    const isAlready = favorites.some((fav) => fav.name === item.name);

    if (isAlready) {
      try {
        await axios.delete("http://localhost:3001/delfavorites", {
          data: { user: user.email, item },
        });
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.name !== item.name)
        );
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      try {
        const response = await axios.post("http://127.0.0.1:3001/favorites", {
          user: user.email,
          item,
        });
        setFavorites((prevFavorites) => [...prevFavorites, response.data]);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route
          path="/eshop"
          element={
            <Eshop addToCart={addToCart} toggleFavorite={toggleFavorite} />
          }
        />
        <Route path="/offers" element={<Offers />} />
        <Route
          path="/food"
          element={
            <AllDayDelights
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/sweet"
          element={
            <Sweet addToCart={addToCart} toggleFavorite={toggleFavorite} />
          }
        />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />}
        />
        <Route
          path="/fav"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/prev" element={<Previous />} />
        <Route path="/rate" element={<Rateus />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/search"
          element={
            <Search addToCart={addToCart} toggleFavorite={toggleFavorite} />
          }
        />
        <Route
          path="/orderplace"
          element={
            <Orderplace
              setCart={setCart}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/previous" element={<Previous />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
