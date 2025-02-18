import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    MotDePasse: "",
    admin: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users",
        formData
      );
      navigate("/admin"); // Redirect to admin page after adding
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="MotDePasse"
          placeholder="Password"
          value={formData.MotDePasse}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="admin"
            checked={formData.admin}
            onChange={handleChange}
          />
          Admin
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;