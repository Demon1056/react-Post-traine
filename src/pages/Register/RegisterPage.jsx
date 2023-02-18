import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import {
  FormStyles,
  FieldStyles,
  ErrorMessageStyled,
} from 'components/Form/ProjectForm.styled';

const textValid = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(textValid, 'Name can only contain Latin letters.')
    .required('Sorry, but Name is a required field'),
  email: yup
    .string()
    .required('Sorry, but Email is a required field')
    .email('Please write your real email (Example: MAILBOX@SUBDOMAIN.COM)'),
  password: yup
    .string()
    .length(8, ' Sorry, but the password should consist of 8 symbols')
    .required('Sorry, but Password is a required field'),
});

const Register = () => {
  const dispatch = useDispatch();
  const registerRequest = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(e, actions) => registerRequest(e, actions)}
      validationSchema={schema}
    >
      <FormStyles>
        <label>
          Name
          <FieldStyles type="text" name="name" />
        </label>{' '}
        <ErrorMessageStyled name="name" component="span" />
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
        <button type="submit">Register</button>
      </FormStyles>
    </Formik>
  );
};
export default Register;
