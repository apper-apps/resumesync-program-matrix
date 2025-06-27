import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;