import React from 'react';
import { Chip, Paper } from '@material-ui/core';
import { Review } from 'types/review';
import { makeStyles } from '@material-ui/core/styles';

type ReviewItemProps = {
  review: Review,
  isHighest: boolean,
  isLowest: boolean,
  isLatest: boolean,
}

const useStyles = makeStyles((theme) => ({
  container: {

  },
}));
const ReviewItemComponent = ({
  review,
  isHighest,
  isLowest,
  isLatest,
}: ReviewItemProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.container}>
      <div>{review.rating}</div>
      <div>{review.comment}</div>
      <div>{review.timestamp}</div>
      <div>{review.user.username}</div>
      {isHighest && (
      <Chip
        variant="outlined"
        size="small"
        label="Highest Rated"
      />
      )}
      {isLowest && (
      <Chip
        variant="outlined"
        size="small"
        label="Lowest Rated"
      />
      )}
      {isLatest && (
      <Chip
        variant="outlined"
        size="small"
        label="Latest"
      />
      )}
    </Paper>
  );
};

export default ReviewItemComponent;
