import { Link } from 'react-router';
import s from './NotFoundPage.module.css';
import { ROUTES } from '../../shared/constants/apiRoutes';

const NotFoundPage = () => {
  return (
    <div className={s['error-page']}>
      <h1>Oops!</h1>
      <div className={s.error404}>404</div>
      <div>Sorry, but no such page was found.</div>
      <Link className={s.link} to={ROUTES.ROOT} data-testid="link-to-home">
        Return to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
