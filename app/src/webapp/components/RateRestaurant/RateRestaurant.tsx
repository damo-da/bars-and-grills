import React, { FormEvent } from 'react';
import {
  Button, FormControl, makeStyles, Paper, TextField, Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

type RateRestaurantProps = {
  onSubmit: Function,
  defaultComment?: string,
  defaultRating?: number,
}

const useStyles = makeStyles((theme) => ({
  form: {

  },
  paper: {
    padding: theme.spacing(2),
  },
  commentControl: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const RateRestaurantComponent = ({
  onSubmit,
  defaultComment,
  defaultRating,
}: RateRestaurantProps) => {
  const [rating, setRating] = React.useState<number>(defaultRating || 5);
  const [comment, setComment] = React.useState<string>(defaultComment || '');
  const classes = useStyles();

  React.useEffect(() => {
    if (defaultRating) setRating(defaultRating);
  }, [defaultRating]);
  React.useEffect(() => {
    if (defaultComment) setComment(defaultComment);
  }, [defaultComment]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      rating,
      comment,
    });
  };

  return (
    <Paper elevation={2} className={classes.paper}>
      <Typography variant="body1" color="textPrimary" component="p">
        Submit your review
      </Typography>
      <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Rating
            name="rating"
            value={rating}
            onChange={(e: React.ChangeEvent<{}>, newValue: number|null) => setRating(newValue || 0)}
          />
        </FormControl>
        <FormControl fullWidth className={classes.commentControl}>
          <TextField
            id="standard-basic"
            label="Review"
            variant="outlined"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
            rowsMax={4}
            rows={2}
            multiline
          />
        </FormControl>
        <FormControl fullWidth>
          <Button variant="contained" color="primary" type="submit">
            Rate/Review
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};

RateRestaurantComponent.defaultProps = {
  defaultComment: '',
  defaultRating: 5,
};

export default RateRestaurantComponent;
