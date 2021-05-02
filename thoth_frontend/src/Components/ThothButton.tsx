import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ThothButton( props: any ) {
  const classes = useStyles();

  const color = props?.color ? props.color : "primary";
  const variant = props?.variant ? props.variant : "outlined";

  return (
      <div className={classes.root}>
          <Button
            color = {color}
            variant = {variant}
          />
      </div>
  );
}