import { lazy } from 'react';

const Board = lazy(() => import('../../pages/kanban-board/Board'));
const Issue = lazy(() => import('../../pages/issue/Issue'));
const Home = lazy(() => import('../../pages/home/Home'));
const Master = lazy(() => import('../../pages/master/Master'));
const Profile = lazy(() => import('../../pages/profile/Profile'));

export interface RouterItem {
  componentElement: React.ReactNode;
  componentPath: string;
}

const RouterItems: Array<RouterItem> = [
  {
    componentElement: <Home />,
    componentPath: '/',
  },
  {
    componentElement: <Board />,
    componentPath: '/board',
  },
  {
    componentElement: <Issue />,
    componentPath: '/issue',
  },
  {
    componentElement: <Master />,
    componentPath: '/master',
  },
  {
    componentElement: <Profile />,
    componentPath: '/profile',
  },
];

export default RouterItems;