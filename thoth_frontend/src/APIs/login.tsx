import axios from 'axios';
import * as paths from './constants';

export const findUser = async (email:string, username: string) => {
    let already_existed = false;
    await axios.get(paths.FIND_USER_PATH, {
        params: {
            email: email,
            username: username,
        }
    })
    .then(function (res) {
        console.log(res);
        //already_existed = res.already_existed;
    });
    
    return already_existed;
};


export const signupUser = async (email:string, username:string, password: string) => {
    let successful = false;
    await axios.post(paths.SIGN_UP_USER, {
            email: email,
            username: username,
            password: password
        }
    )
    .then(function (res) {
        console.log('res is', res);
    });

    return successful;
};