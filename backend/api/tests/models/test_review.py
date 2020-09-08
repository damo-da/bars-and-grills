import unittest
from django.db import IntegrityError
from django.core.exceptions import ValidationError

from api.models import Restaurant, Review, User

RESTAURANT_1 = {'name': "Jackie Franchise"}
USER_1 = {'username': 'user1', 'email': 'user1@testing.com'}

class ReviewTestCases(unittest.TestCase):
    def setUp(self) -> None:
        Review.objects.all().delete()

        self.restaurant1, _ = Restaurant.objects.get_or_create(**RESTAURANT_1)
        self.user1, _ = User.objects.get_or_create(**USER_1)
        self.rating1 = 5
        self.comment1 = 'Nice place'

        self.review = None

    def tearDown(self) -> None:
        if self.review:
            self.review.delete()

    def test_create_review(self):
        """Should be able to create reviews."""
        self.review = Review.objects.create(
            user=self.user1,
            restaurant=self.restaurant1,
            comment=self.comment1,
            rating=self.rating1,
        )

        self.review.full_clean()
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

    def test_comment_length(self):
        """Comment length must not overflow."""

        self.comment1 = 'B' * (Review.COMMENT_LENGTH + 2)

        with self.assertRaises(ValidationError):
            self.test_create_review()

    def test_rating_range(self):
        """Rating must be between 1 and 5."""

        self.rating1 = 6

        with self.assertRaises(ValidationError):
            self.test_create_review()

    def test_rating_must_not_be_0(self):
        """Rating must not be 0."""

        self.rating1 = 0

        with self.assertRaises(ValidationError):
            self.test_create_review()


if __name__ == '__main__':
    unittest.main()
