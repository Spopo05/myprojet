import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { loginUser } from '../redux/actions'; 

const ProtectedRoute = ({ adminOnly = false }) => {
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state);
  
 
  const persistedUser = JSON.parse(localStorage.getItem('user'));
  
  if (!persistedUser?.id) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !persistedUser.admin) {
    return <Navigate to="/Accuiel" replace />;
  }


  if (!user.id) {
    dispatch(loginUser(persistedUser)); 
  }

  return <Outlet />;
};

export default ProtectedRoute;