from .base import *


DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    config('DJANGO_LOCAL_NETWORK_HOST')
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3'
    }
}


CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    "http://" + config('DJANGO_LOCAL_NETWORK_HOST') + ":3000"
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    "http://" + config('DJANGO_LOCAL_NETWORK_HOST') + ":3000"
]
