import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";

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

  return (
    <div className="App">
      <form className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <TextField
              label="Username"
              id="email"
              type="text"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              id="password"
              type="password"
              variant="filled"
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