import { Button, makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import ThothSearchField from "../../components/ThothSearchField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

export default function Home() {
  const classes = useStyles();

    return (
      <>
        <div className={classes.search}>
          <ThothSearchField />
          <Button>
            Search
          </Button>
        </div>
      </>
    );
};