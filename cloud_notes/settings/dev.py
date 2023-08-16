from .base import *


DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    config('LOCAL_NETWORK_IP')
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3'
    }
}


CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    "http://" + config('LOCAL_NETWORK_IP') + ":3000"
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    "http://" + config('LOCAL_NETWORK_IP') + ":3000"
]
