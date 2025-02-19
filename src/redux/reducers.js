const initialState = {
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
    id: "",
    users: [], 
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, ...action.payload };
      case "LOGOUT":
        return initialState;
    case 'UPDATE_COLOR':
      return { ...state, couleur: action.payload };
      case "SET_USERS":
        return { ...state, users: action.payload };
      default:
        return state;
    }
  };
  export const loginUser = (user) => ({
    type: "LOGIN",
    payload: user,
  });
  
  export default userReducer;