import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  FormStyles,
  FieldStyles,
  ErrorMessageStyled,
} from './ProjectForm.styled';
import { addContact } from 'redux/contacts/operations';
import { getContacts } from 'redux/contacts/selectors';

const phoneRegExp =
  /^\(?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const nameValid = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameValid, 'Name can only contain Latin letters.')
    .required('Sorry, but Name is a required field'),
  number: yup
    .string()
    .length(12, ' Sorry, but the phone number should consist of 12 characters')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Sorry, but Number is a required field'),
});

export const ContactForm = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const updateContacts = (values, actions) => {
    if (contacts.find(({ name }) => name === values.name)) {
      Notify.warning(`${values.name} is already in contacts`);
      actions.resetForm();
      return;
    }
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={(e, actions) => updateContacts(e, actions)}
      validationSchema={schema}
    >
      <FormStyles>
        <label>
          Name
          <FieldStyles type="text" name="name" />
        </label>{' '}
        <ErrorMessageStyled name="name" component="span" />
        <label>
          Number
          <FieldStyles type="tel" name="number" />
        </label>
        <ErrorMessageStyled name="number" component="span" />
        <button type="submit">Add contact</button>
      </FormStyles>
    </Formik>
  );
};
