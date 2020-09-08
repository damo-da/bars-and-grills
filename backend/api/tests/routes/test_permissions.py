# Test cases for permissions

import unittest

from rest_framework.test import APIClient

from api.models import User, Group, Restaurant, Review

class PermissionTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.username = 'blackhole'
        self.password = 'isamystery'

        self.client = APIClient()

        self.admin = None
        self.admin_group = None
        self.user = None
        self.user_group = None
        self.restaurant = None
        self.review = None

    def tearDown(self) -> None:
        if self.user:
            self.user.delete()

        if self.user_group:
            self.user_group.delete()

        if self.admin:
            self.admin.delete()

        if self.admin_group:
            self.admin_group.delete()

        if self.restaurant:
            self.restaurant.delete()

        if self.review:
            self.review.delete()

    def create_admin(self):
        self.admin, _ = User.objects.get_or_create(username='admino')
        self.admin.save()

        self.admin_group, _ = Group.objects.get_or_create(name='Admin')
        self.admin.groups.add(self.admin_group)
        self.admin.save()

    def create_user(self):
        self.user, _ = User.objects.get_or_create(username='usero')

        self.user_group, _ = Group.objects.get_or_create(name='Regular')
        self.user.groups.add(self.user_group)
        self.user.save()

    def create_restaurant(self):
        self.restaurant, _ = Restaurant.objects.get_or_create(
            name='Halal Restaurant'
        )

    def test_admin_read(self):
        """Admin permission should enable allow getting /users/."""
        self.create_admin()
        self.client.force_authenticate(self.admin)

        response = self.client.get('/users/')

        self.assertEqual(response.status_code, 200)

    def test_admin_write(self):
        """Admin permission should enable allow writing to /users/."""
        self.create_admin()
        self.client.force_authenticate(self.admin)

        response = self.client.post('/users/', {
            "username": self.username,
            "password": self.password
        })

        self.assertEqual(response.status_code, 201)

        self.user = User.objects.get(username=self.username)

    def test_user_read(self):
        """User should be able to read restaurants."""
        self.create_user()
        self.client.force_authenticate(self.user)

        response = self.client.get('/restaurants/')

        self.assertEqual(response.status_code, 200)

    def test_user_write(self):
        """User should be able to write reviews."""

        self.create_user()
        self.client.force_authenticate(self.user)

        self.create_restaurant()

        response = self.client.post('/reviews/', {
            'rating': 5,
            'comment': 'You must try this restaurant in your lifetime.',
            'restaurant_id': self.restaurant.id,
            'user_id': self.user.id,
        })

        self.assertEqual(response.status_code, 201)

        self.assertTrue(Review.objects.filter(user=self.user.id, restaurant=self.restaurant).exists())


if __name__ == '__main__':
    unittest.main()
