import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const menuItems = [
    { name: 'home', path: '/' },
    { name: 'menu', path: '#explore-menu' },
    { name: 'mobile-app', path: '#app-download' },
    { name: 'contact us', path: '#footer' },
  ];

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" height={50} className="logo" /></Link>
      <ul className="navbar-menu">
        {menuItems.map(item => (
          <li key={item.name}>
            {item.path.startsWith('/') ? (
              <NavLink
                to={item.path}
                onClick={() => setMenu(item.name)}
                className={menu === item.name ? "active" : ""}
              >
                {item.name}
              </NavLink>
            ) : (
              <a
                href={item.path}
                onClick={() => setMenu(item.name)}
                className={menu === item.name ? "active" : ""}
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" aria-label="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart' aria-label="View Cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

