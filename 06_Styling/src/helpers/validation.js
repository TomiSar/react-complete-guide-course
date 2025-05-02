import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long.')
    .required('Password is required.'),
  forename: yup
    .string()
    .trim()
    .max(40, 'Forename must be less than 40 characters long.')
    .required('Forename is required.'),
  surname: yup
    .string()
    .trim()
    .max(40, 'Surname must be less than 40 characters long.')
    .required('Surname is required.'),
});
