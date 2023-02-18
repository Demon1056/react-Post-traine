import { useAuth } from 'components/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';

export const IsLoginNavigation = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const logOutRequest = () => dispatch(logOut());
  return (
    <>
      <p>{user.email}</p>
      <button type="button" onClick={logOutRequest}>
        Logout
      </button>
    </>
  );
};
