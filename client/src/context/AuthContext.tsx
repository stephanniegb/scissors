import { useState, useEffect, createContext } from "react";
import { auth } from "../auth/firebase";
import {
  onAuthStateChanged,
  User,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface AuthContextProps {
  currentUser: User | null;
  signOut: () => Promise<void>;
  signInUsers: (values: LoginFormValues) => Promise<void>;
  createUsers: (values: RegisterformValues) => Promise<void>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface LoginFormValues {
  email_Username: string;
  password: string;
}

interface RegisterformValues {
  email: string;
  username: string;
  createPassword: string;
  confirmPassword: string;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  signOut: async () => {},
  signInUsers: async () => {},
  createUsers: async () => {},
  setCurrentUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createUsers = async (values: RegisterformValues) => {
    const { email, createPassword, username } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        createPassword
      );
      const { user } = userCredential;
      await updateProfile(user, { displayName: username });
      console.log("User:", user);
    } catch (error) {
      console.error(error);
    }
  };

  const signInUsers = async (values: LoginFormValues) => {
    const { email_Username, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email_Username,
        password
      );
      const { user } = userCredential;
      setCurrentUser(user);
      console.log("User:", user.displayName);
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = async () => {
    signOut(auth)
      .then(() => {
        console.log("sign out was a breeze");
      })
      .catch((error) => console.log(error));
  };

  const authContextValue: AuthContextProps = {
    currentUser: currentUser,
    signOut: signOutUser,
    signInUsers: signInUsers,
    createUsers: createUsers,
    setCurrentUser: setCurrentUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
