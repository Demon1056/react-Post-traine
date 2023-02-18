import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import Layout from './Layout/Layout';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from './hooks/useAuth';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivatRoute';

const ContactsPage = lazy(() => import('pages/Contacts/Contacts.jsx'));
const RegisterPage = lazy(() => import('pages/Register/RegisterPage.jsx'));
const LoginPage = lazy(() => import('pages/Login/LoginPage.jsx'));
const NotFoundPage = lazy(() => import('pages/NotFound/NotFound.jsx'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    )
  );
};
