from django.shortcuts import render

# Home page (index.html)
def index(request):
    return render(request, 'index.html')

# Mood page (moodindex.html)
def mood_index(request):
    return render(request, 'moodindex.html')

# Journal page (journal.html)
def journal_index(request):
    return render(request, 'journal.html')

# Mindfulness page (mindfulness.html)
def mindfulness_index(request):
    return render(request, 'mindfulness.html')

# Features page (features.html)
def features(request):
    return render(request, 'features.html')

# About page (about.html)
def about(request):
    return render(request, 'about.html')
