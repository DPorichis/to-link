from django.urls import re_path
from .views import login, signup, update_profile, logout, updateuser


urlpatterns = [
    re_path('login', login),
    re_path('signup', signup),
    re_path('updateuser', updateuser),
    re_path('logout', logout),
    re_path('profile/update/', update_profile),
]