import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      transition: theme.transitions.create('width'),
      width: '100%',
    },
}));

export default function ThothTextField(props: any) {
    const classes = useStyles();

    return (
        <div>
            <TextField 
              label="Search field"
              type="search"
              variant="outlined"
            />
        </div>
    )
}

