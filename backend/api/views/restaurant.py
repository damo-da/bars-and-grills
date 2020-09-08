from django.contrib.auth.models import User
from django.db.models import Count, Avg
from rest_framework import serializers, viewsets

from api.models import Restaurant, Review

class RestaurantUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class RestaurantReviewSerializer(serializers.ModelSerializer):
    user = RestaurantUserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['url', 'id', 'comment', 'rating', 'restaurant', 'user']

class RestaurantSerializer(serializers.HyperlinkedModelSerializer):
    reviews = RestaurantReviewSerializer(many=True, read_only=True)
    review_count = serializers.IntegerField(read_only=True)
    avg_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Restaurant
        fields = ['url', 'id', 'name', 'reviews', 'review_count', 'avg_rating', 'background_image_url']

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.annotate(
            review_count=Count('reviews'),
            avg_rating=Avg('reviews__rating'),
        )
    serializer_class = RestaurantSerializer


