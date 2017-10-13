/* Each component here is a distinct page within the UI */
import HomePage from './HomePage';
import PortfolioPage from './PortfolioPage';
import BlogPage from './BlogPage';
import NotFound from './NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: HomePage
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    exact: true,
    component: PortfolioPage
  },
  {
    path: '/blog',
    name: 'Blog',
    exact: true,
    component: BlogPage
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
];

export default routes;
