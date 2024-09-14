# views.py
from django.http import JsonResponse
from models import Profile, ListingViews, Applied, Link

def get_interactions(request):
    if request.method == 'GET':
        user_interactions = []
        users_network = []

        # Collecting views and applications
        views = ListingViews.objects.all().values('user', 'post', 'timestamp')
        applications = Applied.objects.all().values('user', 'listing', 'timestamp')
        network = Link.objects.all().values('user_id_to', 'user_id_from')

        user_interactions.extend(list(views))
        user_interactions.extend(list(applications))

        users_network.extend(list(network))

        return JsonResponse({"interactions": user_interactions, "network":users_network})