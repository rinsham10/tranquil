from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect

User = get_user_model()  # This will automatically use CustomUser because of AUTH_USER_MODEL


def public_dashboard(request):
    # This will be the first page (homepage) of your project
    return render(request, 'users/public_dashboard.html')


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        full_name = request.POST['full_name']
        mobile = request.POST['phone_number']

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect('register')


        # Create CustomUser directly
        user = User.objects.create_user(
            username=username,
            password=password,
            full_name=full_name,
            mobile=mobile,
        )

        messages.success(request, "Registration successful! Please log in.")
        return redirect('login')

    return render(request, 'users/register.html')


def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')

    return render(request, 'users/login.html')


@login_required
def home_view(request):
    return render(request, 'index.html')


def logout_view(request):
    logout(request)
    return redirect('public_dashboard')  # Or 'dashboard', or whatever page you want after logout

