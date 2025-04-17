from django.contrib import admin
from django.urls import path, include  # Include 'include' here
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
   # Home page - now handled by users.public_dashboard
    path('', include('users.urls')),  # This allows '/' to load the public_dashboard
    path('mood/', views.mood_index, name='moodindex'),
    path('journal/', views.journal_index, name='journal'),
    path('mindfulness/', views.mindfulness_index, name='mindfulness'),
    path('chatbot/', include('chatbotapp.urls')),
    path('users/', include('users.urls')),
]
