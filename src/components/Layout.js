import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateColor } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/lion1.png"; 

const Layout = ({ children }) => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [footerColor, setFooterColor] = useState(user.couleur || 'maroon');

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutUser());
    navigate('/login');
  };

  // Sync color with Redux state
  useEffect(() => {
    if (user.couleur) {
      setFooterColor(user.couleur);
    }
  }, [user.couleur]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setFooterColor(newColor);
    dispatch(updateColor(newColor));
  };
  return (
    <div>
      <header>
      <img src={logo} alt="Logo" className="logo" /> 
            <nav>
                <Link to="/Accueil">Home</Link>
                <Link to="/changeColor">Edit color</Link>
                {user.admin && (<Link to="/admin">Admin Page</Link>)}
            </nav>
        <button onClick={handleLogout} style={{ backgroundColor: user.couleur }}>Se Déconnecter</button>
      </header>
      
      <main> 
            
            <Outlet /> 
      </main>
      <footer style={{ backgroundColor: user.couleur }}>
        <p>Address: 123 Main St</p>
        <div>
          <a href="https://facebook.com">Facebook</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
        <select onChange={handleColorChange} value={footerColor}>
          <option value="red">none</option>
          <option value="maroon">Maroon</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="grey">grey</option>
          <option value="pink">pink</option>
          <option value="red">red</option>
          <option value="yellow">Yellow</option>
        </select>
      </footer>
    </div>
  );
};

export default Layout;