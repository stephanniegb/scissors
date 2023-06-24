import { FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../auth/firebase";

interface FormValues {
  email_Username: string;
  password: string;
}

interface RegisterformValues {
  email: string;
  username: string;
  createPassword: string;
  confirmPassword: string;
}

// login authentication with firebase
const handlelogin = async (values: FormValues) => {
  const { email_Username, password } = values;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email_Username,
      password
    );
    const { user } = userCredential;
    console.log("User:", user);
  } catch (error) {
    console.error(error);
  }
};
const onSubmitLogin = async (
  values: FormValues,
  { resetForm }: FormikHelpers<FormValues>
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { email_Username, password } = values;
  console.log(email_Username, password);
  handlelogin(values);
  resetForm();
};

export const loginFormConfig = {
  initialValues: {
    email_Username: "",
    password: "",
  },
  validationSchema: Yup.object().shape({
    email_Username: Yup.string().required("Email or Username is required"),
    password: Yup.string().required("Password is required"),
  }),

  onSubmit: onSubmitLogin,
};

// create user with firebase
const handleRegister = async (values: RegisterformValues) => {
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
const onSubmitRegister = async (
  values: RegisterformValues,
  { resetForm }: FormikHelpers<RegisterformValues>
) => {
  const { email, createPassword, username } = values;
  console.log(email, createPassword, username);
  handleRegister(values);
  resetForm();
};

export const registerFormConfig = {
  initialValues: {
    email: "",
    username: "",
    createPassword: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    createPassword: Yup.string()
      .min(6, "Please create a stronger password")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("createPassword"), ""], "Passwords must match")
      .required(""),
  }),

  onSubmit: onSubmitRegister,
};
