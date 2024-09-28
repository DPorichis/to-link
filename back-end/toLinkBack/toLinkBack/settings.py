"""
Django settings for toLinkBack project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from datetime import timedelta
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-cco*y1%m0$be*l80qyzr4#(u*qrj=da03nq7x$r6n0b1-om)r)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost:3000'
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    "api",
    "rest_framework",
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'django_extensions'
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Optional: Settings for JWT token expiration, refreshing, etc.
SIMPLE_JWT = {
    'USER_ID_FIELD': 'user_id',
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=5),  # Access token lifetime (optional)
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),  # Refresh token lifetime (optional)
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'toLinkBack.urls'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Add your React frontend URL
    "https://127.0.0.1:3000",
    "https://127.0.0.1:8000",
    "http://localhost:8000"
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",  # Your React app URL
    "https://127.0.0.1:3000"
]

SESSION_TRUSTED_ORIGINS = [
    "http://localhost:3000",  # Your React app URL
    "https://127.0.0.1:3000"
]

# Secure cookie settings
SESSION_COOKIE_SAMESITE = 'None' 
SESSION_COOKIE_SECURE = True  # Ensure you use HTTPS in production
CSRF_COOKIE_SAMESITE = 'None' 
CSRF_COOKIE_SECURE = True  # Ensure you use HTTPS in production
SESSION_COOKIE_HTTPONLY = True

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'toLinkBack.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3'
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'api.User'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend'
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
