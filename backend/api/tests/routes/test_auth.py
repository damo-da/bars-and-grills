# Test cases for /login and /signup

import unittest

from rest_framework.test import APIClient

from api.models import User, Group

class LoginTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.username = 'testuser'
        self.password = 'testpassword'

        self.client = APIClient()

        self.response = None
        self.user = None

    def create_user(self):
        self.user, _ = User.objects.get_or_create(username=self.username)
        self.user.set_password(self.password)
        self.user.save()

    def test_login(self):
        """Users should be able to login without authentication header."""
        self.create_user()

        self.response = self.client.post('/login', {
            'username': self.username,
            'password': self.password,
        })

        self.assertEqual(self.response.status_code, 200)

    def test_signup(self, do_assert=True):
        """Anyone should be able to create new user."""
        self.create_user()
        self.user.delete()

        self.response = self.client.post('/signup', {
            'username': self.username,
            'password': self.password,
        })

        if do_assert:
            self.assertEqual(self.response.status_code, 201)

    def test_short_password(self):
        """Password length must be greater than or equal to 6."""
        self.password = "abcde"

        self.test_signup(do_assert=False)

        self.assertEqual(self.response.status_code, 400)

    def test_signup_group(self):
        """Signed up user must be a regular user."""
        self.test_signup()

        self.assertEqual(self.response.status_code, 201)


if __name__ == '__main__':
    unittest.main()
