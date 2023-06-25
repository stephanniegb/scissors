import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Qrcode } from "../components";
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
          <Qrcode />
        </>
      )}
    </div>
  );
}

export default UrlShortner;
