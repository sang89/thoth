import { makeStyles, Button, TextField, Link } from "@material-ui/core";
import { useParams, useHistory  } from "react-router-dom";
import { useState } from "react";
import * as routes from "../../routes/constants";

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

export default function LoginPage() {

  const classes = useStyles();
  
  const { defaultUsername } = useParams<{ defaultUsername: string }>();

  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState('');
  const [userExisted, setUserExisted] = useState(false);

  const history = useHistory()

  const handleLogIn = () => {

  };

  const handleSignUpLink = () => {
    history.push(`${routes.SIGN_UP_PAGE}`);
  }

  return (
    <form className={classes.root}>
      <TextField 
        label="Username" 
        variant="filled"
        type="username" 
        required 
        value={username}
        onChange={e=> setUsername(e.target.value)}
        error={userExisted}
        helperText={userExisted ? "Username/password not correct" : ""} 
      />
      <TextField 
        label="Password" 
        variant="filled" 
        type="password" 
        required 
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={userExisted}
        helperText={userExisted ? "Username/password not correct" : ""} 
      />
      <Button variant="contained" color="primary" onClick={handleLogIn}>
        Log in
      </Button>
      <Link href="#" onClick={handleSignUpLink}>
        Don't have an account yet ? Signup
      </Link>
    </form>
  );
}