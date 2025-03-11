import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetStarted from './Components/GetStarted';
import Home from './Components/Home';
import Nutrition from './Components/Nutrition';
import Eshop from './Components/Eshop';
import Offers from './Components/Offers';
import Aboutus from './Components/Aboutus';
import CartPage from './Components/CartPage';
import AllDayDelights from './Components/AllDayDelights';
import Sweet from './Components/Sweet';
import Menu from './Components/Menu';
import Favorites from './Components/Favorites';
import Previous from './Components/Previous';
import Search from './Components/Search';
import Orderplace from './Components/Orderplace';
import Rateus from './Components/Rateus';
import Payment from './Components/Payment';
import ContactUs from './Components/ContactUs';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const [user,setUser] = useState(null);

useEffect(()=>{
  const storeduser = localStorage.getItem('user');
  if(storeduser){
    setUser(JSON.parse(storeduser));
  }
},[]);


  const [favorites, setFavorites] = useState([]);
    
 
  useEffect(() => {
    console.log("Current user:", user); 
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:3001/getfavorites', { params: { user:user.email } });
        setFavorites(res.data);
      } catch (err) {
        console.log('Error fetching favorites:', err);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

useEffect(()=>{
  localStorage.setItem('favorites',JSON.stringify(favorites));
  console.log(favorites);
},[favorites]);

const toggleFavorite = async (item) => {
  console.log("Toggling favorite for:", item);
  const isAlready = favorites.some(fav => fav.name === item.name);

  if (isAlready) {
    try {
      await axios.delete('http://localhost:3001/delfavorites', { data: { user:user.email , item } });
      setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.name !== item.name));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  } else {
    try {
      const response = await axios.post('http://127.0.0.1:3001/favorites', { user : user.email, item });
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }
};


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GetStarted />} />
        <Route path='/home' element={<Home />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/eshop' element={<Eshop addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/food' element={<AllDayDelights addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path='/sweet' element={<Sweet addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path='/fav' element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart}/>} />
        <Route path='/prev' element={<Previous />} />
        <Route path='/rate' element={<Rateus />} />
        <Route path='/contactus' element={<ContactUs />} />

        <Route path='/search' element={<Search addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path="/orderplace" element={<Orderplace setCart={setCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />

        <Route path='/payment' element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
