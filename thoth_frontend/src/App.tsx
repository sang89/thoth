import './App.css';
import ThothButton from './Components/ThothButton';
import ThothTextField from './Components/ThothTextField';
import ThothAppBar from './Components/ThothAppBar';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <>
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <ThothAppBar

          />
        </Grid>
        <Grid item xs>
          <ThothTextField
            variant = "outlined" 
            id = "abc"
          />
          <ThothButton
            color = "primary"
            variant = "contained" 
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
