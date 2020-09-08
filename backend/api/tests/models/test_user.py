import unittest
from django.db import IntegrityError
from django.core.exceptions import ValidationError

from api.models import User

class UserTestCases(unittest.TestCase):
    def setUp(self) -> None:
        User.objects.all().delete()

        self.username = 'user1'
        self.password = 'blahblah'

        self.user = None

    def tearDown(self) -> None:
        if self.user:
            self.user.delete()

    def test_create_user(self):
        """Should be able to create user."""
        self.user = User.objects.create(
            username=self.username,
        )
        self.user.set_password(self.password)

        self.user.full_clean()
        self.user.save()

        self.assertGreaterEqual(self.user.id, 0)

    def test_username_not_null(self):
        """Username can not be null."""
        self.username = ""

        with self.assertRaises(ValidationError):
            self.test_create_user()

    def test_username_uniqueness(self):
        """Username must be unique."""
        self.test_create_user()

        with self.assertRaises(IntegrityError):
            self.test_create_user()


if __name__ == '__main__':
    unittest.main()
