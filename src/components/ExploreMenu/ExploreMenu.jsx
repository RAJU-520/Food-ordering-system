import React from 'react';
import PropTypes from 'prop-types';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item) => (
          <div 
            role="button" 
            tabIndex={0} 
            onClick={() => setCategory(prev => (prev === item.menu_name ? "All" : item.menu_name))} 
            key={item.menu_name} 
            className='explore-menu-list-item'
            onKeyPress={(e) => e.key === 'Enter' && setCategory(prev => (prev === item.menu_name ? "All" : item.menu_name))}
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={`Menu item: ${item.menu_name}`} />
            <p>{item.menu_name}</p>
          </div>    
        ))}
      </div>
      <hr />
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
