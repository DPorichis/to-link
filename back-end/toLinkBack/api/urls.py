from django.urls import re_path
from .views import login, signup, update_profile, logout, updateuser, get_post_by_id, \
    upload_post, like_post, comment_post, get_comments_by_post, get_dms_of_convo, \
    send_dm, fetch_convo_menu, retrive_convo, retrive_own_profile, retrive_profile, \
    upload_listing, show_listings, get_applied_by_listing_id, make_request, response_request, \
    apply_by_id, fetch_request, fetch_connections, get_listing_by_id, admin_fetch_connections, \
    admin_fetch_applications, admin_fetch_profile, admin_fetch_personal, admin_fetch_listings, \
    admin_fetch_posts, admin_fetch_comments, admin_fetch_likes, get_all_posts

urlpatterns = [
    re_path('login', login),
    re_path('signup', signup),
    re_path('updateuser', updateuser),
    re_path('logout', logout),

    re_path('profile/own/update/', update_profile),
    re_path('profile/own/fetch', retrive_own_profile),
    re_path('profile/view/', retrive_profile),

    re_path('posts/view/', get_post_by_id),
    re_path('posts/fetch', get_all_posts),
    re_path('posts/upload/', upload_post),
    re_path('posts/like/', like_post),
    re_path('posts/comment/new', comment_post),
    re_path('posts/comment/show', get_comments_by_post),
    
    re_path('convo/list/', fetch_convo_menu),
    re_path('convo/dm/new', send_dm),
    re_path('convo/dm/fetch', get_dms_of_convo),
    re_path('convo/find/', retrive_convo),

    re_path('listings/new', upload_listing),
    re_path('listings/list', show_listings),
    re_path('listing/fetch', get_listing_by_id),
    re_path('listings/applied/fetch', get_applied_by_listing_id),
    re_path('listings/applied/new', apply_by_id),

    re_path('request/new', make_request),
    re_path('request/list', fetch_request),
    re_path('request/respond', response_request),
    re_path('links/list', fetch_connections),



    re_path('admin/fetch/listings', admin_fetch_listings),
    re_path('admin/fetch/personal', admin_fetch_personal),
    re_path('admin/fetch/profile', admin_fetch_profile),
    re_path('admin/fetch/applications', admin_fetch_applications),
    re_path('admin/fetch/posts', admin_fetch_posts),
    re_path('admin/fetch/comments', admin_fetch_comments),
    re_path('admin/fetch/likes', admin_fetch_likes),
    re_path('admin/fetch/connections', admin_fetch_connections)    
]