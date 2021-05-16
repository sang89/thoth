import { Button, makeStyles, TextField, useTheme } from "@material-ui/core";
import { useState } from "react";
import * as apis from "../APIs/login"

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
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async () => {
      const user_existed = await apis.findUser(email, username);
      console.log(email, username, password);
    };

    return (
      <form className={classes.root}>
          <TextField 
            label="Email" 
            variant="filled" 
            type="email" 
            required
            value={email} 
            onChange={e => setEmail(e.target.value)} />
          <TextField 
            label="Username" 
            variant="filled"
            type="username" 
            required 
            value={username}
            onChange={e=> setUsername(e.target.value)} />
          <TextField 
            label="Password" 
            variant="filled" 
            type="password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <div>
          <Button variant="contained">
              Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>
              Signup
          </Button>
          </div>
      </form>
    )
}


