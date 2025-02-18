import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateColour, loginUser } from '../../redux/actions';

const ChangeColor = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state);
  const [selectedColor, setSelectedColor] = useState(user.couleur || 'maroon');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    setLoading(true);
    setError('');

    try {
      // Update backend
      const response = await axios.put(
        `https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users/${user.id}`,
        { couleur: newColor }
      );

      // Update Redux store with full user data from response
      dispatch(loginUser(response.data));
    } catch (err) {
      setError('Failed to save color preference. Please try again.');
      console.error('Color update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="color-picker">
      <h2>Change Theme Color</h2>
      {error && <p className="error-message">{error}</p>}
      
      <select 
        value={selectedColor} 
        onChange={handleColorChange}
        disabled={loading}
      >
        <option value="maroon">Maroon</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
      </select>

      {loading && <p className="loading-text">Saving preference...</p>}
    </div>
  );
};

export default ChangeColor;