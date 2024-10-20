import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        // Retrieve cart items from localStorage or initialize as empty object
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : {};
    });
    const [foodList, setFoodList] = useState([]);
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = {
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1,
            };
            // Update localStorage whenever cart items change
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 0) {
                const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
                // Update localStorage
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                return updatedCart;
            }
            return prev;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, itemId) => {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                return totalAmount + (itemInfo ? itemInfo.price * cartItems[itemId] : 0);
            }
            return totalAmount;
        }, 0);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            const cartData = response.data.cartData;
            setCartItems(cartData);
            localStorage.setItem("cartItems", JSON.stringify(cartData)); // Sync with localStorage
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const loadData = async () => {
                await fetchFoodList();
                await loadCartData(storedToken);
            };
            loadData();
        }
    }, []); // Run only on mount

    const contextValue = {
        food_list,
        foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
