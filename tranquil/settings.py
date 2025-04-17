from pathlib import Path

# Base directory where your project is located
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

import environ
env = environ.Env()
environ.Env.read_env()
OPENAI_API_KEY = env('OPENAI_API_KEY')
print(OPENAI_API_KEY)  # This will print the API key to the console



# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-4rm)zrpd%mtj^ysv^g!kjtu2g5im0m1%xvsnw=tyvv^pwbd@p)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'chatbotapp',
    'users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'tranquil.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'tranquil' / 'templates'],  # Corrected path
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tranquil.wsgi.application'

DATABASES = {
     'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME':'tranquil_db',
        'USER': 'postgres',       # Your database user
        'PASSWORD': '12345',   # Your database password
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Password validation
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

# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# settings.py

STATIC_URL = '/static/'

# Add this line to tell Django where to look for static files
STATICFILES_DIRS = [
    BASE_DIR / 'tranquil' / 'static',  # Update this path based on where your static files are stored
]

# Optional: If you have static files in app-specific directories
STATIC_ROOT = BASE_DIR / 'staticfiles'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Redirects Django's default login URL to your custom login page
LOGIN_URL = '/users/login/'
LOGIN_REDIRECT_URL = '/'  # This sends users to home page after successful login
LOGOUT_REDIRECT_URL = '/'  # Optional, where users go after logout


AUTH_USER_MODEL = 'users.CustomUser'
