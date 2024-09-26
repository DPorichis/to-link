from api.models import Applied, ListingViews, Link, Profile, Listing, \
      PostViews, LikedBy, Post, Comment, PostRecom, ListingRecom
import numpy as np
import json

def listing_recom():
    print("Listing recom started...")
    user_views = []
    user_applications = []
    users_network = []

    # Collecting views and applications
    views = ListingViews.objects.all().values('user', 'listing')
    user_views.extend(list(views))

    print(views)

    applications = Applied.objects.all().values('user', 'listing')
    user_applications.extend(list(applications))

    print(applications)

    network = Link.objects.all().values('user_id_to', 'user_id_from')
    users_network.extend(list(network))

    print(network)

    # Fetch only active users and listings
    active_users = Profile.objects.all().values_list('user', flat=True)

    print(active_users)

    active_listings = Listing.objects.all().values_list('listing_id', flat=True)

    print(active_listings)

    n_users = len(active_users)
    n_items = len(active_listings)

    # Create mappings for user-index and listing-index
    user_index = {user_id: idx for idx, user_id in enumerate(active_users)}
    listing_index = {listing_id: idx for idx, listing_id in enumerate(active_listings)}
    
    # And the reverse
    index_user = {idx: user_id for user_id, idx in user_index.items()}
    index_listing = {idx: listing_id for listing_id, idx in listing_index.items()}

    # Jim is like, very funny. Here are the weights he decided to use a
    # random Saturday afternoon
    view_weight = 0.1
    apply_weight = 1

    # Calculating R based on given data
    R = np.zeros((n_users, n_items))
    for apl in applications:
        R[user_index[apl['user']]][listing_index[apl['listing']]] += apply_weight
    for view in views:
        R[user_index[view['user']]][listing_index[view['listing']]] += view_weight

    print("Data recieved, doing Matrix Factorization...")
    # Now we can finaly do matrix factorization on R, 
    # This implementation doesn't take the user's network into account, it rather creates recommentations for all users
    recom = matrix_factorization(R, n_users, n_items)

    n_recommendations = 5
    if n_recommendations > n_items:
        n_recommendations = n_items
    top_recom = np.argsort(recom, axis=1)[:, -n_recommendations:] # Get the top n_recommendations
    top_recom = np.flip(top_recom, axis=1)
    
    print("Matrix Factorization completed, entering data to the DB")
    
    for user in range(n_users):
        prf = Profile.objects.get(user=index_user[user])
        for idx in range(n_recommendations):
            lst = Listing.objects.get(listing_id=index_listing[top_recom[user, idx]])
            ListingRecom.objects.create(user=prf, listing=lst)

    print("Listing Recom Completed.")


    return


    # # Uncomment if needed (network only factorization)

    # # Get the connections of the users
    # connections = {}
    # for link in users_network:
    #     user_from = link.user_id_from
    #     user_to = link.user_id_to
        
    #     if user_from.id not in connections:
    #         connections[user_from.id] = set()
    #     connections[user_from.id].add(user_to.id)
        
    #     if user_to.id not in connections:
    #         connections[user_to.id] = set()
    #     connections[user_to.id].add(user_from.id)

    # # Create sub Rs with only their network inside
    # user = 3 # Hypothetical

    # # Get only the rows of user's network (and him at the top)
    # users_connections = connections.get(user, set())
    # users_connections = [user] + users_connections
    # R_sub = R[users_connections, :]
    
    
    # recom = matrix_factorization(R_sub, n_users, n_items)
    

def post_recom():
    print("Posts recom started...")
    user_views = []
    user_likes = []
    users_comments = []

    # Collecting views and applications
    views = PostViews.objects.all().values('user', 'post')
    user_views.extend(list(views))

    print(views)

    likes = LikedBy.objects.all().values('user', 'post')
    user_likes.extend(list(likes))

    print(likes)

    comments = Comment.objects.all().values('user', 'post')
    users_comments.extend(list(comments))

    print(comments)

    # Fetch only active users and listings
    active_users = Profile.objects.all().values_list('user', flat=True)

    print(active_users)

    active_posts = Post.objects.all().values_list('post_id', flat=True)

    print(active_posts)

    n_users = len(active_users)
    n_items = len(active_posts)

    # Create mappings for user-index and listing-index
    user_index = {user_id: idx for idx, user_id in enumerate(active_users)}
    post_index = {post_id: idx for idx, post_id in enumerate(active_posts)}
    
    # And the reverse
    index_user = {idx: user_id for user_id, idx in user_index.items()}
    index_post = {idx: post_id for post_id, idx in post_index.items()}

    # Jim is like, very funny. Here are the weights he decided to use a
    # random Saturday afternoon
    view_weight = 0.1
    like_weight = 1
    comment_weight = 2

    # Calculating R based on given data
    R = np.zeros((n_users, n_items))
    for like in likes:
        R[user_index[like['user']]][post_index[like['post']]] += like_weight
    for view in views:
        R[user_index[view['user']]][post_index[view['post']]] += view_weight
    for comment in comments:
        R[user_index[comment['user']]][post_index[comment['post']]] += comment_weight


    print("Data recieved, doing Matrix Factorization...")
    # Now we can finaly do matrix factorization on R, 
    # This implementation doesn't take the user's network into account, it rather creates recommentations for all users
    recom = matrix_factorization(R, n_users, n_items)

    print("Matrix Factorization completed, entering data to the DB")

    n_recommendations = 5
    if n_recommendations > n_items:
        n_recommendations = n_items
    top_recom = np.argsort(recom, axis=1)[:, -n_recommendations:] # Get the top n_recommendations
    top_recom = np.flip(top_recom, axis=1)

    for user in range(n_users):
        prf = Profile.objects.get(user=index_user[user])
        for idx in range(n_recommendations):
            pst = Post.objects.get(post_id=index_post[top_recom[user, idx]])
            PostRecom.objects.create(user=prf, post=pst)
    
    print("Posts Recom Completed.")

    return




def matrix_factorization(R, n_users, n_items):
    # Factorization Parameters (as shown in the lecture notes)
    k = 5 
    h = 0.02
    max_rounds = 5000
    prev = -1

    # User-based Matrix
    V = np.random.rand(n_users, k)
    # Listing-based Matrix
    F = np.random.rand(k, n_items)

    for round in range(max_rounds):
        for user in range(n_users):
            for listing in range(n_items):
                if R[user][listing] > 0:
                    # Error calculation
                    aprox = np.dot(V[user,:], F [:,listing])
                    e = R[user][listing] - aprox
                    # Adjusting aproximation
                    for feature in range(k):
                        # Find gradients
                        gr_V = -2*e*F[feature][listing]
                        gr_F = -2*e*V[user][feature]
                        # Update in oposite direction
                        V[user][feature] = V[user][feature] - h * gr_V
                        F[feature][listing] = F[feature][listing] - h * gr_F
        
        # Evaluate total error of approximation
        aprox_R = np.dot(V,F)
        total_error = 0
        val_count = 1
        for user in range(n_users):
            for listing in range(n_items):
                if R[user][listing] > 0:
                    total_error += pow(R[user][listing] - aprox_R[user][listing], 2)
                    val_count += 1
        rmse = np.sqrt(1/val_count*total_error)
        # If the error did not get substantially better, break
        if prev * 0.9999 <= rmse and round != 0:
            break
        prev = rmse
        print("Round Completed " + str(round))

    recom_R = aprox_R

    for user in range(n_users):
        for listing in range(n_items):    
            if R[user][listing] > 0:
                recom_R[user][listing] = 0

    return recom_R
