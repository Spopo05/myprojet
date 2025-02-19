import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from '../../redux/actions';
const AdminPage = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    age: "",
    admin: false,
    MotDePasse: "",
    pseudo: "",
    prenom: "",
    couleur: "",
    Devise: "",
    Pays: "",
    avatar: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      nom: user.nom,
      age: user.age,
      admin: user.admin,
      MotDePasse: user.MotDePasse,
      pseudo: user.pseudo,
      prenom: user.prenom,
      couleur: user.couleur,
      Devise: user.Devise,
      Pays: user.Pays,
      avatar: user.avatar,
      email: user.email,
      photo: user.photo,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await axios.put(
          `https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users/${selectedUser.id}`,
          formData
        );
      } else {
        await axios.post(
          "https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users",
          formData
        );
      }
      dispatch(fetchUsers());
      setShowModal(false);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="admin-page1">
      <h2>Admin Dashboard</h2>
      <button className="add-user-btn1" onClick={() => setShowModal(true)}>
        Add New User
      </button>
      <div class="table-container">
      <table className="users-table1" id="users-table1">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Age</th>
            <th>Pseudo</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Couleur</th>
            <th>Devise</th>
            <th>Pays</th>
            <th>Avatar</th>
            <th>Photo</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.age}</td>
              <td>{user.pseudo}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>{user.couleur}</td>
              <td>{user.Devise}</td>
              <td>{user.Pays}</td>
              <td>
                <img src={user.avatar} alt="Avatar" className="avatar-img1" />
              </td>
              <td>
                <img src={user.photo} alt="img" className="photo-img1" />
              </td>
              <td>{user.admin ? "Oui" : "Non"}</td>
              <td>
                <button className="edit-btn1" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn1"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {showModal && (
        <div className="modal-overlay1">
          <div className="modal1">
            <h3>{selectedUser ? "Edit User" : "Create User"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group1">
                <label>Nom:</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Age:</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Pseudo:</label>
                <input
                  type="text"
                  value={formData.pseudo}
                  onChange={(e) =>
                    setFormData({ ...formData, pseudo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Prénom:</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Mot de Passe:</label>
                <input
                  type="password"
                  value={formData.MotDePasse}
                  onChange={(e) =>
                    setFormData({ ...formData, MotDePasse: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Couleur:</label>
                <input
                  type="text"
                  value={formData.couleur}
                  onChange={(e) =>
                    setFormData({ ...formData, couleur: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Devise:</label>
                <input
                  type="text"
                  value={formData.Devise}
                  onChange={(e) =>
                    setFormData({ ...formData, Devise: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Pays:</label>
                <input
                  type="text"
                  value={formData.Pays}
                  onChange={(e) =>
                    setFormData({ ...formData, Pays: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group1">
                <label>Avatar URL:</label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                />
              </div>
              <div className="form-group1">
                <label>Photo URL:</label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                />
              </div>
              <div className="form-group1">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.admin}
                    onChange={(e) =>
                      setFormData({ ...formData, admin: e.target.checked })
                    }
                  />
                  Admin
                </label>
              </div>
              <div className="modal-actions1">
                <button  type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;