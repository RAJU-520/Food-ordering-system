import './Restaurants.css';
import { assets } from '../../assets/assets';

const Restaurants = () => {
  return (
<div className="Restaurants-platform">
  <h2>Popular Restaurants</h2>
  <div>
    <img src={assets.restaurant_1} alt="McDonald's" />
    <figcaption>McDonalds <br/>Hyderabad, Manikonda</figcaption>
  </div>
  <div>
    <img src={assets.restaurant_2} alt="Brahma PureVeg" />
    <figcaption>Brahma PureVeg<br/>Vizag, Andhra Pradesh</figcaption>
  </div>
  <div>
    <img src={assets.restaurent_3} alt="Barbeque Pride" />
    <figcaption>Barbeque Pride<br/>Vijayawada, Andhra Pradesh</figcaption>
  </div>
</div>
);
}

export default Restaurants;
