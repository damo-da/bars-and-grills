from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, RestaurantViewSet, ReviewViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'restaurants', RestaurantViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
