from django.db.models import Count, Avg
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Restaurant, Review
from .rest_serializers import UserSerializer, RestaurantSerializer, ReviewSerializer

__all__ = ['UserViewSet', 'RestaurantViewSet', 'ReviewViewSet']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.annotate(
            review_count=Count('reviews'),
            avg_rating=Avg('reviews__rating'),
        )
    serializer_class = RestaurantSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
