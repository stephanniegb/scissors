import { FormikHelpers } from "formik";
import * as Yup from "yup";

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

const onSubmitLogin = async (
  values: FormValues,
  { resetForm }: FormikHelpers<FormValues>
) => {
  const { email_Username, password } = values;
  console.log(email_Username, password);
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

const onSubmitRegister = async (
  values: RegisterformValues,
  { resetForm }: FormikHelpers<RegisterformValues>
) => {
  const { email, createPassword, username } = values;
  console.log(email, createPassword, username);

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
