import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const operations = [fetchContacts, addContact, deleteContact];

const getActions = type => operations.map(action => action[type]);

const fetchContactsFulfilledReducer = (state, action) => {
  state.contacts.items = action.payload;
};
const addContactFulfilledReducer = (state, action) => {
  state.contacts.items.push(action.payload);
};
const deleteContactFulfilledReducer = (state, action) => {
  const index = state.contacts.items.findIndex(
    task => task.id === action.payload.id
  );
  state.contacts.items.splice(index, 1);
};
const pendingReducer = state => {
  state.contacts.isLoading = true;
};
const rejectedReducer = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};
const fulfilledReducer = state => {
  state.contacts.isLoading = false;
  state.contacts.error = null;
};
export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsFulfilledReducer)
      .addCase(addContact.fulfilled, addContactFulfilledReducer)
      .addCase(deleteContact.fulfilled, deleteContactFulfilledReducer)
      .addMatcher(isAnyOf(...getActions('pending')), pendingReducer)
      .addMatcher(isAnyOf(...getActions('rejected')), rejectedReducer)
      .addMatcher(isAnyOf(...getActions('fulfilled')), fulfilledReducer),
});
