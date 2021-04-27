import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

function App() {

  // 
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }),
  );
  
  const [oldInput, setOldInput] = useState('');
  const [inputText, setInputText] = useState('');

  const classes = useStyles();
  
  const handleOnClicked = () => {
      setOldInput(inputText);
  };

  return (
    <div className="App">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="filled-basic" 
          label="Question" 
          variant="outlined"
          onChange= { event => { setInputText(event.target.value);} } 
        />
        <Button 
          variant="contained"
          onClick= { () => handleOnClicked()}
        >
          Click
        </Button>
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="filled-basic" 
          label= {oldInput} 
          variant="outlined" 
        />
      </form>
    </div>
    
  );
}

export default App;
