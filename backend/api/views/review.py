from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from rest_framework.fields import CurrentUserDefault
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
    user = ReviewUserSerializer(read_only=True, default=serializers.CurrentUserDefault())
    user_id = serializers.IntegerField(read_only=True)
    restaurant_id = serializers.IntegerField()
    timestamp = serializers.DateTimeField(read_only=True)
    comment = serializers.CharField(allow_blank=True)

    class Meta:
        model = Review
        fields = ['url', 'id', 'comment', 'rating', 'restaurant', 'user', 'restaurant_id', 'user_id', 'timestamp']

    def save(self, **kwargs):
        user: User = self.context['request'].user
        self.validated_data['user_id'] = user.id
        return super().save(**kwargs)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    permission_classes = [Or(AllUserRead, AllUserWrite)]