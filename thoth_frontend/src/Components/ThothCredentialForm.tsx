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

interface CredentialFormProps {
    handleSubmit: () => void;
    handleCancel: () => void;
    error: boolean;
    errorMsg: string;
    emailNeeded: boolean;
    mainButtonText: string;
}

export default function ThothCredentialForm(props: CredentialFormProps){
    
    const classes = useStyles();
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = props.handleSubmit;

    const handleCancel = props.handleCancel;
    const [error, setError] = useState(props.error);
    const [errorMsg, setErrorMsg] = useState(props.errorMsg);

    useEffect(() => {
        setError(props.error);
        setErrorMsg(props.errorMsg);
    }, [props]);

    return (
      <form className={classes.root}>
          { props.emailNeeded ? 
            <TextField 
                label="Email" 
                variant="filled" 
                type="email" 
                required
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                error={error}
                helperText={error ? errorMsg : ""}
            />
          : <></>}
          <TextField 
            label="Username" 
            variant="filled"
            type="username" 
            required 
            value={username}
            onChange={e=> setUsername(e.target.value)} 
            error={error}
            helperText={error ? errorMsg : ""}
          />
          <TextField 
            label="Password" 
            variant="filled" 
            type="password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)} 
            error={error}
            helperText={error ? errorMsg : ""}
          />
          <div>
            <Button variant="contained" onClick={handleCancel}>
                Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                { props.mainButtonText }
            </Button>
          </div>
      </form>
    )
}

