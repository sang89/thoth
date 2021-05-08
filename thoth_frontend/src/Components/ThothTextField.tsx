import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

export default function ThothTextField(props: any) {
    const classes = useStyles();

    const variant = props?.variant ? props.variant : "outlined";

    return (
        <div className={classes.root}>
            <TextField
                variant = {variant}
            />
        </div>
    )
}

