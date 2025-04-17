from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal Info", {"fields": ("full_name", "email", "mobile")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "full_name", "email", "mobile", "password1", "password2"),
        }),
    )

    list_display = ("username", "full_name", "email", "mobile", "is_staff", "is_active")
    search_fields = ("username", "full_name", "email", "mobile")
    ordering = ("username",)

admin.site.register(CustomUser, CustomUserAdmin)