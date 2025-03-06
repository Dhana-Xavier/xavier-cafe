import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuNavbar2 from './MenuNavbar2';
import NavBar from './NavBar';
import Footer from './Footer';
import { newCoffee } from './ContentCofee';
import { newIced } from './ContentIced';
import { newCool } from './ContentCoolDrinks';
import { newShake } from './ContentShakes';
import { newChiller } from './ContentChillers';
import { newFrappe } from './ContentFrappe';
import { newShared } from './ContentShared';
import { newEgg } from './ContentEgg';
import { newToast } from './ContentToast';
import { newDelights } from './ContentAllday';
import { newSandwiches } from './ContentSand';
import { newSundae } from './ContentSundae';
import { newIce } from './ContentIce';
import { newCakes } from './ContentCake';
import { newBurger } from './ContentBurgers';
import { newChoco } from './ContentChoco';

import './Menu.css';

export default function Menu() {

  const [activeCategory,setActiveCategory]=useState(null);
  const navigate = useNavigate();
  const toggleCategory=(category)=>{
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="menu-container">
      <NavBar />
      <MenuNavbar2 />

      <div className="menu-content">
        
        <div className="menu-sidebar">
          <h2>Drinks</h2>
          <ul>
            <li onClick={() => navigate('/eshop#coffee')}>Coffee</li>
            <li onClick={() => navigate('/eshop#beverage')}>Beverage</li>
            <li onClick={() => navigate('/eshop#cooldrinks')}>Cooldrinks</li>
            <li onClick={() => navigate('/eshop#frappe')}>Frappe</li>
            <li onClick={() => navigate('/eshop#shakes')}>MilkShakes</li>
            <li onClick={() => navigate('/eshop#chillers')}>Chillers</li>
          </ul>

          <h2>Food</h2>
          <ul>
            <li onClick={() => navigate('/food#splates')}>Shared Plates</li>
            <li onClick={() => navigate('/food#egg')}>Egg Benedict</li>
            <li onClick={() => navigate('/food#toast')}>Toasts</li>
            <li onClick={() => navigate('/food#sand')}>Sandwiches</li>
            <li onClick={() => navigate('/food#all')}>Delights</li>
          </ul>

          <h2>Deserts</h2>
          <ul>
            <li onClick={() => navigate('/sweet#sundae')}>Sundae</li>
            <li onClick={() => navigate('/sweet#ice')}>Ice Creams</li>
            <li onClick={() => navigate('/sweet#cake')}>Cakes</li>
            <li onClick={() => navigate('/sweet#choco')}>Chocolates</li>
          </ul>
        </div>


        <div className="menu-items">
          <h1>Menu</h1>

          <h2>Drinks</h2>
          <hr />
          {activeCategory === 'coffee' && (
            <div className="submenu-section">
              <h2>Coffee Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#coffeepop')}>
                {newCoffee.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

 {activeCategory === 'iced' && (
            <div className="submenu-section">
              <h2>Coffee Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#beverage')}>
                {newIced.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'cool' && (
            <div className="submenu-section">
              <h2>Coffee Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#cooldrinks')}>
                {newCool.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'shakes' && (
            <div className="submenu-section">
              <h2>Coffee Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#shakes')}>
                {newShake.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'frappe' && (
            <div className="submenu-section">
              <h2>Coffee Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#frappe')}>
                {newFrappe.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'chiller' && (
            <div className="submenu-section">
              <h2>Coffee Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#chillers')}>
                {newChiller.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 


          <div className="menu-grid" >
            <div className="menu-item" onClick={() => toggleCategory('coffee')}>
              <img src="./Menu/menu1.png" alt="Coffee" />
              <p>Coffee</p>
            </div>
            
            <div className="menu-item" onClick={() => toggleCategory('iced')} >
              <img src="./Menu/menu2.png" alt="Beverage" />
              <p>Beverage</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('cool')}>
              <img src="./Menu/menu3.png" alt="Cold Drinks" />
              <p>Cool Drinks</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('frappe')}>
              <img src="./Menu/menu4.png" alt="Frappe" />
              <p>Frappe</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('shakes')}>
              <img src="./Menu/menu5.png" alt="Milk Shakes" />
              <p>Milk Shakes</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('chiller')}>
              <img src="./Menu/menu6.png" alt="Chillers" />
              <p>Chillers</p>
            </div>
          </div>

         
        

          <h2>Food</h2>
          <hr />
       



{activeCategory === 'shared' && (
            <div className="submenu-section">
              <h2>Food Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/food#splate')}>
                {newShared.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'egg' && (
            <div className="submenu-section">
              <h2>Food Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/food#egg')}>
                {newEgg.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'toast' && (
            <div className="submenu-section">
              <h2>Food Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/food#toast')}>
                {newToast.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'delights' && (
            <div className="submenu-section">
              <h2>Food Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/food#all')}>
                {newDelights.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 
           {activeCategory === 'sandwiches' && (
            <div className="submenu-section" >
              <h2>Food Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#sand')}>
                {newSandwiches.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 

{activeCategory === 'burgers' && (
            <div className="submenu-section" >
              <h2>Food Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/eshop#sand')}>
                {newBurger.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 
   






          <div className="menu-grid">
            <div className="menu-item" onClick={() => toggleCategory('shared')}>
              <img src="./Menu/m1.png" alt="Shared Plates" />
              <p>Shared Plates</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('egg')}>
              <img src="./Menu/m2.png" alt="Egg Benedict" />
              <p>Egg Benedict</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('toast')}>
              <img src="./Menu/m3.png" alt="Toasts" />
              <p>Toasts</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('sandwiches')}>
              <img src="./Menu/m4.png" alt="sandwichs" />
              <p>Sandwiches</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('delights')}>
              <img src="./Menu/m5.png" alt="Delights" />
              <p>Delights</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('burgers')}>
              <img src="./Menu/m6.png" alt="Burgers" />
              <p>Burgers</p>
            </div>
          </div>





          <h2>Deserts</h2>
          <hr />
          {activeCategory === 'sundae' && (
            <div className="submenu-section">
              <h2>Desert Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/sweet#sundae')}>
                {newSundae.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 
            {activeCategory === 'ice' && (
            <div className="submenu-section">
              <h2>Desert Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/sweet#ice')}>
                {newIce.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 
            {activeCategory === 'cake' && (
            <div className="submenu-section">
              <h2>Desert  Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/sweet#cake')}> 
                {newCakes.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 
           {activeCategory === 'choco' && (
            <div className="submenu-section">
              <h2>Desert  Menu</h2>
              <hr />
              <div className="menu-grid" onClick={()=>navigate('/sweet#choco')}> 
                {newChoco.map((item, index) => (
                  <div className="menu-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>RS: {item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )} 
            
          
          <div className="menu-grid"  >
            <div className="menu-item" onClick={() => toggleCategory('sundae')} >
              <img src="./Menu/d1.png" alt="Sundae" />
              <p>Sundae</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('ice')}>
              <img src="./Menu/d2.png" alt="Ice Creams" />
              <p>Ice Creams</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('cake')}>
              <img src="./Menu/d3.png" alt="Cakes" />
              <p>Cakes</p>
            </div>
            <div className="menu-item" onClick={() => toggleCategory('choco')}>
              <img src="./Menu/d4.png" alt="Chocolates" />
              <p>Chocolates</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}