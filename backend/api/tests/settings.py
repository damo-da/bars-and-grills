from core.settings import INSTALLED_APPS, SECRET_KEY, MIDDLEWARE, TEMPLATES, REST_FRAMEWORK

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test.db.sqlite3',
    }
}

ROOT_URLCONF = 'api.urls'
