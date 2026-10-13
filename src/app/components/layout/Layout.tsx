import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Sahifa o'zgarganda scrollni eng boshiga olib chiqish
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
