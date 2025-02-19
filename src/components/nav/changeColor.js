import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../../redux/actions';
import { getTextColor } from '../../utils/colorUtils';

const ChangeColor = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state);
  const [selectedColor, setSelectedColor] = useState(user.couleur || 'maroon');
  const [textColor, setTextColor] = useState(getTextColor(selectedColor));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTextColor(getTextColor(selectedColor));
  }, [selectedColor]);

  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(
        `https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users/${user.id}`,
        { couleur: newColor }
      );
      dispatch(loginUser(response.data));
    } catch (err) {
      setError('Failed to save color preference. Please try again.');
      console.error('Color update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="color-picker" style={{ backgroundColor: selectedColor, color: textColor }}>
      <h2 style={{color: textColor}}>Change Theme Color</h2>
      {error && <p className="error-message">{error}</p>}
      
      <select 
        value={selectedColor} 
        onChange={handleColorChange}
        disabled={loading}
        style={{ color: textColor, backgroundColor: selectedColor }}
      >
        <option value="maroon">Maroon</option>
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
        <option value="grey">Grey</option>
        <option value="pink">Pink</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>

      {loading && <p className="loading-text">Saving preference...</p>}
    </div>
  );
};

export default ChangeColor;
