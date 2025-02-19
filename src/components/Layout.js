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
        <button className='deconn' onClick={handleLogout} style={{ backgroundColor: user.couleur }}>Se Déconnecter</button>
      </header>
      
      <main> 
            
            <Outlet /> 
      </main>
      <footer className="footer" style={{ backgroundColor: user.couleur }}>
      <div className="footer-content">
        <div className="footer-left">
          <h3>Company</h3>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Careers</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>
          <p>Blog</p>
          <p>FAQ</p>
          <p>Support</p>
          <p>Community</p>
        </div>

        <div className="footer-right">
          <h3>Contact</h3>
          <p>📍 Address: 123 Main St</p>
          <p>📞 Phone: (123) 456-7890</p>
          <p>📧 Email: info@company.com</p>
        </div>
      </div>

      <div className="footer-social">
          <a href="https://facebook.com" className="social-link" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
          </a>
          <a href="https://instagram.com" className="social-link" aria-label="Instagram">
            <i className="fab fa-instagram"></i> {/* Instagram icon */}
          </a>
          <a href="https://twitter.com" className="social-link" aria-label="Twitter">
            <i className="fab fa-twitter"></i> {/* Twitter icon */}
          </a>
          <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i> {/* LinkedIn icon */}
          </a>
      </div>
    </footer>
    </div>
  );
};

export default Layout;