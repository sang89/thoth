import { Button, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import * as apis from "../APIs/login";

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
    
    const registerUser = async (email: string, username: string, password: string) => {
      const res = await apis.signUp(email, username, password);
      setSuccess(res);
    };

    const handleSubmit = async () => {
      await apis.userAlreadyExisted(email, username).then(response => {
        const already_existed = response;
        if (!already_existed) {
          registerUser(email, username, password);
        }
      });
    };

    return (
      <form className={classes.root}>
          <TextField 
            label="Email" 
            variant="filled" 
            type="email" 
            required
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            error={userExisted}
            helperText="User already registered"
          />
          <TextField 
            label="Username" 
            variant="filled"
            type="username" 
            required 
            value={username}
            onChange={e=> setUsername(e.target.value)} 
            error={userExisted}
            helperText="User already registered"
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
            <Button variant="contained">
                Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Signup
            </Button>
          </div>
      </form>
    )
}


