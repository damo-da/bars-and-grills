from datetime import datetime

from django.db import models
from django.contrib.auth import models as auth_models

__all__ = ['User', 'Restaurant', 'Review', 'Group']

User = auth_models.User
Group = auth_models.Group

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Review(models.Model):
    RATING_CHOICES = ((1, 1), (2, 2), (3, 3), (4, 4), (5, 5))

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_visited = models.DateTimeField(default=datetime.now)
    comment = models.CharField(max_length=200)
    rating = models.IntegerField(choices=RATING_CHOICES, null=False)

    def __str__(self):
        return self.comment
