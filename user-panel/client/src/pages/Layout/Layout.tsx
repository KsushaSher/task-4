import { Outlet } from 'react-router';
import s from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <header className={s.header}>THE APP</header>
      <Outlet />
    </>
  );
};

export default Layout;
