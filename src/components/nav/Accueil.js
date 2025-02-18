import { useSelector } from 'react-redux';

const Accueil = () => {
  // Access the entire state object
  const user = useSelector((state) => state);
  
  
  console.log("Current Redux state:", user); // Debug the entire state

  return (
    <div className="accueil-container">
      <h1>Welcome to Our Application</h1>
      {user.id ? ( // Check for a unique identifier
        <div>
          <p className='P'>Now you have become a Lion. 
            <h1>{user.prenom} {user.nom} !</h1>
          </p>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="user-avatar"
            />
          )}
        </div>
      ) : (
        <div>
          <p className='P'>Please log in to see your personalized content.</p>
          <p className='P'>Debug: User ID - {user.id || 'undefined'}</p>
        </div>
      )}
    </div>
  );
};

export default Accueil;