from django.urls import path
from . import views

urlpatterns = [
    path('', views.public_dashboard, name='public_dashboard'),  # Home page (new dashboard page)
    path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),
    path('index/', views.home_view, name='index'),  # After login, this will be your dashboard
    path('logout/', views.logout_view, name='logout'),
]
