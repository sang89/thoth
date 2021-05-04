import * as constants from './constants';
import HomePage from '../pages/HomePage';
import InputQueryPage from '../pages/InputQueryPage';
import LogInPage from '../pages/LogInPage';

export const routes = [
    {
        path: constants.HOME_PAGE,
        exact: true,
        name: "Homepage",
        component: HomePage,
    },
    {
        path: constants.INPUT_QUERY_PAGE,
        exact: true,
        name: "Input Query Page",
        component: InputQueryPage,
    },
    {
        path: constants.LOG_IN,
        exact: true,
        name: "Log In",
        component: LogInPage,
    }
];
