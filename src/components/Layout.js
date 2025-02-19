import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateColor } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/lion1.png"; 
import { getTextColor } from '../utils/colorUtils'; 


const Layout = ({ children }) => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(user.couleur || 'maroon');

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutUser());
    navigate('/login');
  };

  // Sync color with Redux state
  useEffect(() => {
    if (user.couleur) {
      setSelectedColor(user.couleur);
    }
  }, [user.couleur]);

  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);

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
            <button 
                className='deconn' 
                onClick={handleLogout} 
                style={{ backgroundColor: user.couleur, color: getTextColor(selectedColor) }}
            >   
                Log Out   <i className="fas fa-sign-out-alt"></i>
            </button>

      </header>
      
      <main> 
            
            <Outlet /> 
      </main>
      <footer className="footer" style={{ backgroundColor: user.couleur }}>
      <div className="footer-content" style={{color: getTextColor(selectedColor)}}>
        <div className="footer-left">
          <h3>Company</h3>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Careers</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>

        <div className="footer-center" style={{color: getTextColor(selectedColor)}}>
          <h3>Quick Links</h3>
          <p>Blog</p>
          <p>FAQ</p>
          <p>Support</p>
          <p>Community</p>
        </div>

        <div className="footer-right" style={{color: getTextColor(selectedColor)}}>
          <h3>Contact</h3>
          <p>📍 Address: 123 Main St</p>
          <p>📞 Phone: (+212) 656-789080</p>
          <p>📧 Email: info@company.com</p>
        </div>
      </div>

      <div className="footer-social" style={{color: getTextColor(selectedColor)}}>
          <a href="https://facebook.com" className="social-link" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i> 
          </a>
          <a href="https://instagram.com" className="social-link" aria-label="Instagram">
            <i className="fab fa-instagram"></i> 
          </a>
          <a href="https://twitter.com" className="social-link" aria-label="Twitter">
            <i className="fab fa-twitter"></i> 
          </a>
          <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i> 
          </a>
      </div>
    </footer>
    </div>
  );
};

export default Layout;