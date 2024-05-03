import {Home, Popular, Show} from '../pages';
import {RouteObject, createBrowserRouter} from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import {ROUTES} from './constants';
import Toprated from '../pages/Top_rated/Toprated';
import Nowplaying from '../pages/Now_playing/Nowplaying';
import Myfavorites from '../pages/My_favorites/Myfavorites';

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter />,
        children: [
            {path: ROUTES.HOME, element: <Home />},
            {path: ROUTES.POPULAR, element: <Popular />},
            {path: ROUTES.TOP_RATED, element: <Toprated/>},
            {path: ROUTES.NOW_PLAYING, element: <Nowplaying/>},
            {path: ROUTES.MY_FAVORITES, element: <Myfavorites/>},
            {path: `${ROUTES.SHOW}:id`, element: <Show/>},

        ]
    },
    {
        path: 'login', element: <PublicRouter />,
        children: [
            {path: '/login', element: <div>Login</div>}
        ]
    }
];

export const router = createBrowserRouter(routes);