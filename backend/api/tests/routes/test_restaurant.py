# Test cases for /restaurants/

import unittest
from typing import List

from rest_framework.test import APIClient

from api.models import Restaurant, User

class RestaurantTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.restaurant_name = 'Best Burgers'
        self.restaurant_background_url = 'https://foo.bar/image.jpg'

        self.user = User(username="poppycat")
        self.user.save()

        self.client = APIClient()

        self.response = None
        self.restaurant = None

    def tearDown(self) -> None:
        if self.restaurant:
            self.restaurant.delete()

        if self.user:
            self.user.delete()

    def create_restaurant(self):
        self.restaurant, _ = Restaurant.objects.get_or_create(
            name=self.restaurant_name,
            background_image_url=self.restaurant_background_url
        )

    def test_get_one(self, do_assert=True):
        """Getting a single restaurant is possible"""
        self.client.force_authenticate(self.user)
        self.create_restaurant()

        self.response = self.client.get(f'/restaurants/{self.restaurant.id}/')

        if do_assert:
            self.assertEqual(self.response.status_code, 200)

    def test_get_many(self):
        """Restaurant listing should work."""
        self.client.force_authenticate(self.user)
        self.create_restaurant()

        self.response = self.client.get('/restaurants/')

        api_response = self.response.json()

        restaurants: List[Restaurant] = api_response['results']

        restaurant = next(r for r in restaurants if r['id'] == self.restaurant.id)

        self.assertIsNotNone(restaurant)

    def test_create(self):
        """Restaurant should be able to be created."""
        self.client.force_authenticate(self.user)

        self.response = self.client.post('/restaurants/', {
            'name': self.restaurant_name,
            'background_image_url': self.restaurant_background_url,
        })

        api_restaurant = self.response.json()

        self.restaurant = Restaurant(id=api_restaurant['id'])

        self.assertEqual(self.response.status_code, 201)

    def test_delete(self):
        """Restaurant should be able to be deleted."""
        self.client.force_authenticate(self.user)
        self.create_restaurant()

        self.response = self.client.delete(f'/restaurants/{self.restaurant.id}/')

        self.assertEqual(self.response.status_code, 204)

        with self.assertRaises(Restaurant.DoesNotExist):
            self.restaurant = Restaurant.objects.get(id=self.restaurant.id)

    def test_update(self):
        """Restaurant should be able to be updated."""
        self.client.force_authenticate(self.user)
        self.create_restaurant()

        self.response = self.client.put(f'/restaurants/{self.restaurant.id}/', {
            'name': 'New Name',
            'background_image_url': 'http://blahblah.com/image.jpg',
        })

        self.assertEqual(self.response.status_code, 200)

        self.restaurant = Restaurant.objects.get(id=self.restaurant.id)

        self.assertEqual(self.restaurant.name, 'New Name')
        self.assertEqual(self.restaurant.background_image_url, 'http://blahblah.com/image.jpg')


if __name__ == '__main__':
    unittest.main()
