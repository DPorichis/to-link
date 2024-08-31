from django.urls import re_path
from . import views


urlpatterns = [
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('updateuser', views.updateuser),
    re_path('logout', views.logout),
    re_path('profile/update/', views.update_profile),
]