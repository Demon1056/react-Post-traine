import { NavLink } from 'react-router-dom';

export const IsNotLoginNavigation = () => {
  return (
    <>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </>
  );
};
