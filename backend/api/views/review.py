from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from api.models import Restaurant, Review
from rest_condition import Or

from api.permissions import AllUserRead, AllUserWrite

class ReviewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ReviewRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['url', 'id', 'name']

class ReviewSerializer(serializers.ModelSerializer):
    restaurant = ReviewRestaurantSerializer(read_only=True)
    user = ReviewUserSerializer(read_only=True)
    user_id = serializers.IntegerField()
    restaurant_id = serializers.IntegerField()

    class Meta:
        model = Review
        fields = ['url', 'id', 'comment', 'rating', 'restaurant', 'user', 'restaurant_id', 'user_id']

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    permission_classes = [Or(AllUserRead, AllUserWrite)]
