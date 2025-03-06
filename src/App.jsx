import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Nutrition from './Components/Nutrition';
import Eshop from './Components/Eshop';
import Offers from './Components/Offers';
import Aboutus from './Components/Aboutus';
import CartPage from './Components/CartPage';
import AllDayDelights from './Components/AllDayDelights';
import Sweet from './Components/Sweet';
import Menu from './Components/Menu';
import Favorites from './Components/favorites';
import Previous from './Components/Previous';
import Search from './Components/Search';
import Orderplace from './Components/Orderplace';
import Rateus from './Components/Rateus';
import Payment from './Components/Payment';
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

 
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

 
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  
  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isAlready = prevFavorites.some(fav => fav.name === item.name);
      if (isAlready) {
        return prevFavorites.filter(fav => fav.name !== item.name);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/eshop' element={<Eshop addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/food' element={<AllDayDelights addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path='/sweet' element={<Sweet addToCart={addToCart} toggleFavorite={toggleFavorite} />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path='/fav' element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart}/>} />

        <Route path='/prev' element={<Previous/>}></Route>
        <Route path='/rate' element={<Rateus/>}></Route>
        <Route path='/search' element={<Search addToCart={addToCart} toggleFavorite={toggleFavorite} />} ></Route>
        <Route path='/orderplace' element={<Orderplace setCart={setCart}/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
