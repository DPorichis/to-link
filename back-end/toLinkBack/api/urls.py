from django.urls import re_path, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import login, signup, update_profile, logout, fetch_user_info, update_user, update_user_password,\
    upload_post, like_post, comment_post, get_comments_by_post, get_dms_of_convo, \
    send_dm, fetch_convo_menu, retrive_convo, retrive_own_profile, retrive_profile, \
    upload_listing, show_listings, get_applied_by_listing_id, make_request, response_request, \
    apply_by_id, fetch_request, fetch_connections, get_listing_by_id, admin_fetch_connections, \
    admin_fetch_applications, admin_fetch_profile, admin_fetch_personal, admin_fetch_listings, \
    admin_fetch_posts, admin_fetch_comments, admin_fetch_likes, get_all_posts, check_if_applied, \
    update_listing, check_if_like_exist, get_post_by_user_id, fetch_searching_links, fetch_searching_non_links ,admin_fetch_users, \
    fetch_notifications, dismiss_notification_by_id, retrive_header_info, get_posts_id, get_post_by_id, \
    get_interactions, request_export, delete_post, delete_profile, fetch_others_connections

urlpatterns = [
    re_path('login', login),
    re_path('signup', signup),
    re_path('user/fetch', fetch_user_info),
    re_path('user/update', update_user),
    re_path('user/newPassword', update_user_password),
    re_path('logout', logout),
    re_path('profile/own/update/', update_profile),
    re_path('profile/own/header',retrive_header_info),
    re_path('profile/own/fetch', retrive_own_profile),
    re_path('profile/view/', retrive_profile),
    re_path('profile/fetch_searching',fetch_searching_links),
    re_path('profile/fetch_searchout', fetch_searching_non_links),
    re_path('profile/delete',delete_profile),


    re_path('posts/view/byid', get_post_by_id),
    re_path('posts/fetch/all', get_all_posts),
    re_path('posts/fetch/user', get_post_by_user_id),
    re_path('posts/upload/', upload_post),
    re_path('posts/like/new', like_post),
    re_path('posts/like/exists', check_if_like_exist),
    re_path('posts/comment/new', comment_post),
    re_path('posts/comment/show', get_comments_by_post),
    re_path('posts/getid', get_posts_id),
    re_path('posts/delete', delete_post),

    
    re_path('convo/list/', fetch_convo_menu),
    re_path('convo/dm/new', send_dm),
    re_path('convo/dm/fetch', get_dms_of_convo),
    re_path('convo/find/', retrive_convo),

    re_path('notification/fetch', fetch_notifications),
    re_path('notification/dismiss', dismiss_notification_by_id),

    re_path('listings/new', upload_listing),
    re_path('listings/update', update_listing),
    re_path('listings/list', show_listings),
    re_path('listing/fetch', get_listing_by_id),
    re_path('listings/applied/fetch', get_applied_by_listing_id),
    re_path('listings/applied/new', apply_by_id),
    re_path('listings/applied/check', check_if_applied),
    
    re_path('request/new', make_request),
    re_path('request/list', fetch_request),
    re_path('request/respond', response_request),
    re_path('links/list', fetch_connections),
    re_path('links/other', fetch_others_connections),

    re_path('admin/fetch/listings', admin_fetch_listings),
    re_path('admin/fetch/personal', admin_fetch_personal),
    re_path('admin/fetch/profile', admin_fetch_profile),
    re_path('admin/fetch/applications', admin_fetch_applications),
    re_path('admin/fetch/posts', admin_fetch_posts),
    re_path('admin/fetch/comments', admin_fetch_comments),
    re_path('admin/fetch/likes', admin_fetch_likes),
    re_path('admin/fetch/connections', admin_fetch_connections),
    re_path('admin/fetch/allusers', admin_fetch_users),
    re_path('admin/export', request_export),   

    re_path('reco/init', get_interactions), 

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


