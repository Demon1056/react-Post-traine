import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import {
  FormStyles,
  FieldStyles,
  ErrorMessageStyled,
} from 'components/Form/ProjectForm.styled';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Sorry, but Email is a required field')
    .email('Please write your real email (Example: MAILBOX@SUBDOMAIN.COM)'),
  password: yup
    .string()
    .length(8, ' Sorry, but the password should consist of 8 symbols')
    .required('Sorry, but Password is a required field'),
});

const Login = () => {
  const dispatch = useDispatch();
  const loginRequest = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(e, actions) => loginRequest(e, actions)}
      validationSchema={schema}
    >
      <FormStyles>
        <label>
          Email
          <FieldStyles type="email" name="email" />
        </label>
        <ErrorMessageStyled name="email" component="span" />
        <label>
          Password
          <FieldStyles type="password" name="password" />
        </label>
        <ErrorMessageStyled name="password" component="span" />
        <button type="submit">Login</button>
      </FormStyles>
    </Formik>
  );
};
export default Login;
