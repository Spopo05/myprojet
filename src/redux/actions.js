import axios from "axios";

export const loginUser = (user) => ({
    type: "LOGIN",
    payload: user,
  });
  
  export const logoutUser = () => ({
    type: "LOGOUT",
  });
  
  export const updateColour = (color) => ({
    type: 'UPDATE_COLOR',
    payload: color
  });
  // In redux/actions.js
 export const updateColor = (color) => (dispatch, getState) => {
  // Update local storage immediately
        const currentState = getState();
        const updatedState = { ...currentState, couleur: color };
        localStorage.setItem('user', JSON.stringify(updatedState));

  // Dispatch to Redux
  dispatch({
    type: 'UPDATE_COLOR',
    payload: color
  });
 };
 
  export const setUsers = (users) => ({
    type: "SET_USERS",
    payload: users,
  });
  
// In src/redux/actions.js
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users"
    );
    dispatch({ type: "SET_USERS", payload: response.data });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://67719603ee76b92dd49017b3.mockapi.io/louriga2mehdi/users/${id}`
    );
    dispatch({ type: "DELETE_USER", payload: id });
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};