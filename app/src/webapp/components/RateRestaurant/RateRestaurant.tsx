import React, {FormEvent} from 'react';
import {Button, makeStyles, TextField} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

type RateRestaurantProps = {
  onSubmit: Function,
  defaultComment?: string,
  defaultRating?: number,
}

const useStyles = makeStyles((theme) => ({
  form: {

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      rating,
      comment,
    });
  };

  return (
    <form noValidate className={classes.form} onSubmit={handleSubmit}>
      <Rating
        name="rating"
        value={rating}
        onChange={(e: React.ChangeEvent<{}>, newValue: number|null) => setRating(newValue || 0)}
      />
      <TextField
        id="standard-basic"
        label="Review"
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Rate/Review
      </Button>
    </form>
  );
};

RateRestaurantComponent.defaultProps = {
  defaultComment: '',
  defaultRating: 5,
};

export default RateRestaurantComponent;
