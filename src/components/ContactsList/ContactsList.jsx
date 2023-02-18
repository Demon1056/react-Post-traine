import PropTypes from 'prop-types';
import { ListItem } from './ContactsListStyled';
import { deleteContact } from 'redux/contacts/operations';
import { useDispatch } from 'react-redux';

export const ContactList = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <ul>
      {data.map(item => (
        <ListItem key={item.id}>
          {`${item.name} : ${item.number}`}
          <button
            onClick={() => {
              return dispatch(deleteContact(item.id));
            }}
          >
            Delete
          </button>
        </ListItem>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
};
