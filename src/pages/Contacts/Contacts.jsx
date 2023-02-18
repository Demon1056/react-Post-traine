import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Loading, Report } from 'notiflix/build/notiflix-loading-aio';
import { ContactForm } from 'components/Form/Form';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { InformationArea } from './Contacts.styled';
import { fetchContacts } from 'redux/contacts/operations';
import {
  getContacts,
  getIsLoading,
  getError,
} from '../../redux/contacts/selectors';
import { getFilter } from 'redux/filter/selectors';

const Contacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const loading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toUpperCase().includes(filter.toUpperCase())
    );
  };
  return (
    <>
      {error &&
        Report.failure(
          'Sorry, something going wrong',
          'Please try again.',
          'Okay'
        )}
      {loading && !error
        ? Loading.arrows({ svgColor: ' aqua' })
        : Loading.remove()}
      <ContactForm />
      <InformationArea>
        <h2>CONTACTS</h2>
        <Filter />
        {contacts.length > 0 && <ContactList data={filterContacts()} />}
      </InformationArea>
    </>
  );
};

export default Contacts;
