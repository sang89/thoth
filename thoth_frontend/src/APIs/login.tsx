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
