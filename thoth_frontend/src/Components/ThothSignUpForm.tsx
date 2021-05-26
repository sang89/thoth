import { Button, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as apis from "../APIs/login";
import * as routes from "../routes/constants";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
  '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
  '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
  }));

export default function ThothForm(props: any){
    
    const classes = useStyles();
    
    const [userExisted, setUserExisted] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    
    const history = useHistory();
    
    const registerUser = async (email: string, username: string, password: string) => {
      await apis.signUp(email, username, password).then(res => {
        console.log('res is', res);
        setSuccess(res);
      });
    };

    const handleSubmit = async () => {
      await apis.userAlreadyExisted(email, username).then(response => {
        const already_existed = response;
        setUserExisted(already_existed);
        if (!already_existed) {
          registerUser(email, username, password);
        }
      });
    };

    const handleCancel = () => {
      setEmail('');
      setUsername('');
      setPassword('');
      setUserExisted(false);
    };
    
    useEffect(() => {
      if (success) {
        history.push(`${routes.LOG_IN_WITHOUT_DEFAULT}/${username}`);
      }
    }, [success]);

    return (
      <form className={classes.root}>
          {success ? <></> : 
          <>
          <TextField 
            label="Email" 
            variant="filled" 
            type="email" 
            required
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            error={userExisted}
            helperText={userExisted ? "User already registered": ""}
          />
          <TextField 
            label="Username" 
            variant="filled"
            type="username" 
            required 
            value={username}
            onChange={e=> setUsername(e.target.value)} 
            error={userExisted}
            helperText={userExisted ? "User already registered": ""}
          />
          <TextField 
            label="Password" 
            variant="filled" 
            type="password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
          <div>
            <Button variant="contained" onClick={handleCancel}>
                Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Signup
            </Button>
          </div>
          </>}
      </form>
    )
}

