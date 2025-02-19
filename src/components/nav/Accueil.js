import { useSelector } from 'react-redux';

const Accueil = () => {
  const user = useSelector((state) => state);
  
  

  return (
    <div className="accueil-container">
      <h1>Welcome to Our Application</h1>
      {user.id ? ( 
        <div>
          <p className='p'>Now you have become a Lion(ess). 
            <strong>{user.prenom} {user.nom} !</strong>
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
          <p>Please log in to see your personalized content.</p>
          <p>Debug: User ID - {user.id || 'undefined'}</p>
        </div>
      )}
    </div>
  );
};

export default Accueil;