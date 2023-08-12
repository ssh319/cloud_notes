from .base import *


DEBUG = False

ALLOWED_HOSTS = [] # Production server domain name


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT')
    }
}


CORS_ALLOWED_ORIGINS = []
                            # Production server domain name
CSRF_TRUSTED_ORIGINS = []
