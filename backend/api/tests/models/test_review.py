import unittest
from api.models import Restaurant, Review, User
from django.db import IntegrityError

RESTAURANT_1 = {'name': "Jackie Franchise"}
USER_1 = {'username': 'user1', 'email': 'user1@testing.com'}

class ReviewTestCases(unittest.TestCase):
    def setUp(self) -> None:
        Review.objects.all().delete()

        self.restaurant1, _ = Restaurant.objects.get_or_create(**RESTAURANT_1)
        self.user1, _ = User.objects.get_or_create(**USER_1)
        self.review = None

    def test_create_review(self):
        """Should be able to create reviews."""
        self.review = Review.objects.create(
            user=self.user1,
            restaurant=self.restaurant1,
            comment='Nice place',
            rating=5,
        )

        self.review.save()

        self.assertGreaterEqual(self.review.id, 0)

    def test_create_duplicate_review(self):
        """Should not be able to create reviews for same user for same restaurant."""
        self.test_create_review()

        with self.assertRaises(IntegrityError):
            self.test_create_review()

    def test_required_restaurant_for_review(self):
        """Should not be able to create reviews with null restaurant."""

        with self.assertRaises(IntegrityError):
            self.restaurant1 = None

            self.test_create_review()

    def test_required_user_for_review(self):
        """Should not be able to create reviews with null user."""
        with self.assertRaises(IntegrityError):
            self.user1 = None

            self.test_create_review()


if __name__ == '__main__':
    unittest.main()
