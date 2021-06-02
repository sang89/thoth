import _ from 'lodash';

export default function authHeader() {
    const user = JSON.parse(_.toString(localStorage.getItem('user')));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}