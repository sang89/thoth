import * as constants from './constants';
import HomePage from '../pages/HomePage';
import INPUT_QUERY_PAGE from '../pages/InputQueryPage';

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
        component: INPUT_QUERY_PAGE,
    }
];
