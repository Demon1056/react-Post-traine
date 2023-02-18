import { Outlet } from 'react-router-dom';
import { PhoneBook, LayoutArea } from './Layout.styled';
import { IsLoginNavigation } from 'components/Navigation/IsLoginNavigation';
import { IsNotLoginNavigation } from 'components/Navigation/IsNotLoginNavigation';
import { useAuth } from 'components/hooks/useAuth';
import { Suspense } from 'react';

const Layout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <PhoneBook>
      <LayoutArea>
        {isLoggedIn ? <IsLoginNavigation /> : <IsNotLoginNavigation />}
      </LayoutArea>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </PhoneBook>
  );
};

export default Layout;
