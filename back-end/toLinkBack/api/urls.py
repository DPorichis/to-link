from django.urls import re_path
from .views import login, signup, update_profile, logout, updateuser, get_post_by_id, upload_post, like_post, comment_post, get_comments_by_post


urlpatterns = [
    re_path('login', login),
    re_path('signup', signup),
    re_path('updateuser', updateuser),
    re_path('logout', logout),
    re_path('profile/update/', update_profile),
    re_path('posts/view/', get_post_by_id),
    re_path('posts/upload/', upload_post),
    re_path('posts/like/', like_post),
    re_path('posts/comment/new', comment_post),
    re_path('posts/comment/show', get_comments_by_post)    
]