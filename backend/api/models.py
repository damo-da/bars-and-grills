from datetime import datetime

from django.db import models
from django.contrib.auth import models as auth_models

__all__ = ['User', 'Restaurant', 'Review', 'Group']

User = auth_models.User
Group = auth_models.Group

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    background_image_url = models.CharField(max_length=1000, null=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    class Meta:
        unique_together = (('user', 'restaurant'),)

    RATING_CHOICES = ((1, 1), (2, 2), (3, 3), (4, 4), (5, 5))
    COMMENT_LENGTH = 200

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_visited = models.DateTimeField(default=datetime.now)
    comment = models.CharField(max_length=COMMENT_LENGTH)
    rating = models.IntegerField(choices=RATING_CHOICES, null=False)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment

    def clean(self):
        # if self.comment:
        #     self.comment = self.comment[:Review.COMMENT_LENGTH]

        # _ = next(choice for choice in Reviewrating
        super().clean()
