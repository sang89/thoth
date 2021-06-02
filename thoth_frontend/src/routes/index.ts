import * as constants from './constants';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';

export const routes = [
    {
        path: constants.HOME_PAGE,
        exact: true,
        name: constants.HOME_PAGE_NAME,
        component: HomePage,
    },
    {
        path: constants.SEARCH_PAGE,
        exact: true,
        name: constants.SEARCH_PAGE_NAME,
        component: SearchPage,
    },
    {
        path: constants.LOG_IN_PAGE,
        exact: false,
        name: constants.LOG_IN_PAGE_NAME,
        component: LogInPage,
    },
    {
        path: constants.SIGN_UP_PAGE,
        exact: true,
        name: constants.SIGN_UP_PAGE_NAME,
        component: SignUpPage,
    }
];
