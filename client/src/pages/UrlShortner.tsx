import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function UrlShortner() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const signOutHandler = () => {
    signOut();
    navigate("/");
  };

  return (
    <div>
      {currentUser && (
        <>
          <p>{`signed in as : ${currentUser.displayName} ${currentUser.email}`}</p>

          <button onClick={signOutHandler}>sign out</button>
        </>
      )}
    </div>
  );
}

export default UrlShortner;
