from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Home page (index.html)
@login_required(login_url='login')  # Redirect to login if not authenticated
def index(request):
    return render(request, 'index.html')

# Mood page (moodindex.html)
@login_required(login_url='login')  # Redirect to login if not authenticated
def mood_index(request):
    return render(request, 'moodindex.html')

# Journal page (journal.html)
@login_required(login_url='login')  # Redirect to login if not authenticated
def journal_index(request):
    return render(request, 'journal.html')

# Mindfulness page (mindfulness.html)
@login_required(login_url='login')  # Redirect to login if not authenticated
def mindfulness_index(request):
    return render(request, 'mindfulness.html')

# Features page (features.html)
@login_required(login_url='login')  # Redirect to login if not authenticated
def features(request):
    return render(request, 'features.html')

# About page (about.html)
@login_required(login_url='login')  # Redirect to login if not authenticated
def about(request):
    return render(request, 'about.html')
