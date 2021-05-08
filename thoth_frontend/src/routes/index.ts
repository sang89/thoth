import * as constants from './constants';
import HomePage from '../pages/HomePage';
import InputQueryPage from '../pages/InputQueryPage';
import LogInPage from '../pages/LogInPage';

export const routes = [
    {
        path: constants.HOME_PAGE,
        exact: true,
        name: constants.HOME_PAGE_NAME,
        component: HomePage,
    },
    {
        path: constants.INPUT_QUERY_PAGE,
        exact: true,
        name: constants.INPUT_QUERY_PAGE_NAME,
        component: InputQueryPage,
    },
    {
        path: constants.LOG_IN_PAGE,
        exact: true,
        name: constants.LOG_IN_PAGE_NAME,
        component: LogInPage,
    }
];
