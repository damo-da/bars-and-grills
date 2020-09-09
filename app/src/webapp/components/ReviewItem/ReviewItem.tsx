import React from 'react';
import { Chip, Paper } from '@material-ui/core';
import { Review } from 'types/review';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Moment from 'react-moment';

type ReviewItemProps = {
  review: Review,
  isHighest: boolean,
  isLowest: boolean,
  isLatest: boolean,
  isCurrentUserReview: boolean,
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  username: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  timestamp: {
    color: theme.palette.text.secondary,
  },
}));
const ReviewItemComponent = ({
  review,
  isHighest,
  isLowest,
  isLatest,
  isCurrentUserReview,
}: ReviewItemProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.container}>
      <div className={classes.userContainer}>
        <AccountCircleIcon />
        <span className={classes.username}>
          {review.user.username}
        </span>
        {isCurrentUserReview && (
        <Chip
          size="small"
          color="secondary"
          label="You"
        />
        )}
      </div>
      <Rating
        name="avg_rating"
        size="small"
        value={review.rating}
        readOnly
      />
      <div>{review.comment}</div>
      <div className={classes.timestamp}>
        <Moment fromNow>{review.timestamp}</Moment>
      </div>

      {isHighest && (
      <Chip
        variant="outlined"
        size="small"
        color="secondary"
        label="Highest Rated"
      />
      )}
      {isLowest && (
      <Chip
        variant="outlined"
        size="small"
        color="primary"
        label="Lowest Rated"
      />
      )}
      {isLatest && (
      <Chip
        variant="outlined"
        size="small"
        color="primary"
        label="Latest"
      />
      )}
    </Paper>
  );
};

export default ReviewItemComponent;
