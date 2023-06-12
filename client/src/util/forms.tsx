import { FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  email_Username: string;
  email: string;
  username: string;
  password: string;
  createPassword: string;
  confirmPassword: string;
}

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

const onSubmit = async (
  values: FormValues,
  { resetForm }: FormikHelpers<FormValues>
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  resetForm();
  console.log(values);
};

export const formConfig = {
  initialValues: {
    email_Username: "",
    email: "", // Add the missing properties
    username: "",
    password: "",
    createPassword: "",
    confirmPassword: "",
  },
  validationSchema: Yup.object().shape({
    email_Username: Yup.string().required("Email or Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    createPassword: Yup.string()
      .min(6)
      .matches(passwordRegex, { message: "Please create a stronger password" })
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("createPassword"), ""], "Passwords must match")
      .required(""),
  }),

  onSubmit: onSubmit,
};
