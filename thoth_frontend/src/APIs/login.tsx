import axios from 'axios';
import _ from 'lodash';
import * as paths from './constants';

export const findUser = async (email: string, username: string) => {
    let res;
    await axios.get(paths.FIND_USER_PATH, {
        params: {
            email: email,
            username: username,
        }
    }).then(response => {
        res = _.get(response, 'data');
    });
    return res;
};

export const userAlreadyExisted = async (email: string, username: string): Promise<any> => {
    const existed = await findUser(email, username).then(response => {
        const already_existed = _.get(response, "already_existed");
        return already_existed;
    });
    return existed;
}


export const signUp = async (email: string, username: string, password: string): Promise<any> => {
    return await axios.post(paths.SIGN_UP_USER, {
        'email': email,
        'username': username,
        'password': password,
    }).then(res => {
        const data =  _.get(res, 'data')
        const success = _.get(data, 'successful');
        return success;
    });
}
