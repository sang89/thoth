import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { useParams  } from "react-router-dom";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: theme.spacing(1),
      },
    }
  )
);

export default function LoginPage() {

  const classes = useStyles();
  
  const { defaultUsername } = useParams<{ defaultUsername: string }>();

  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState('');
  
  return (
    <div className="App">
      <form className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <TextField 
              label="Username" 
              variant="filled"
              type="username" 
              required 
              value={username}
              onChange={e=> setUsername(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Password" 
              variant="filled" 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12} >
            <Button variant="contained" type="button" color="primary">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}