import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from the URL
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    MotDePasse: "",
    admin: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/${id}`
        );
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch user details.");
      }
    };
    fetchUser();
  }, [id]);

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
      await axios.put(
        `https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users/${id}`,
        formData
      );
      navigate("/admin"); // Redirect to admin page after editing
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;