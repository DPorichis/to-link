import numpy as np
import json


def listing_recom():

    views = []
    applications = []
    users_network= []
    n_users = 5
    n_items = 4

    # Jim is like, very funny. Here are the weights he decided to use a
    # random Saturday afternoon
    view_weight = 0.1
    apply_weight = 1

    # Calculating R based on given data
    R = np.zeros((n_users, n_items))
    for apl in applications:
        R[apl.user][apl.listing] += apply_weight
    for view in views:
        R[view.user][view.listing] += view_weight

    # Now we can finaly do matrix factorization on R, 
    # This implementation doesn't take the user's network into account, it rather creates recommentations for all users
    recom = matrix_factorization(R, n_users, n_items)

    n_recommendations = 5
    top_recom = np.argsort(recom, axis=1)[:, -n_recommendations:] # Get the top n_recommendations
    top_recom = np.flip(top_recom, axis=1)

    # Create a response of the populated data to the server
    top_recommendations = []
    # Create a JSON object for each user containing their info
    for user in range(n_users):
        user_recommendations = {
            "user_id": user,
            "top_items": []
        }

        for idx in range(n_recommendations):
            user_recommendations["top_items"].append(top_recom[user, idx])

        top_recommendations.append(user_recommendations)


    # Convert to JSON
    top_recom_json = json.dumps(top_recommendations, indent=4)

    # Print the JSON
    print(top_recom_json)



    # Uncomment if needed (network only factorization)

    # Get the connections of the users
    connections = {}
    for link in users_network:
        user_from = link.user_id_from
        user_to = link.user_id_to
        
        if user_from.id not in connections:
            connections[user_from.id] = set()
        connections[user_from.id].add(user_to.id)
        
        if user_to.id not in connections:
            connections[user_to.id] = set()
        connections[user_to.id].add(user_from.id)

    # Create sub Rs with only their network inside
    user = 3 # Hypothetical

    # Get only the rows of user's network (and him at the top)
    users_connections = connections.get(user, set())
    users_connections = [user] + users_connections
    R_sub = R[users_connections, :]
    
    
    recom = matrix_factorization(R_sub, n_users, n_items)
    


def matrix_factorization(R, n_users, n_items):
    # Factorization Parameters (as shown in the lecture notes)
    k = 5 
    h = 0.02
    max_rounds = 5000
    prev = -1

    # User-based Matrix
    V = np.random.rand((n_users, k))
    # Listing-based Matrix
    F = np.random.rand((k, n_items))

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
        val_count = 0
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

    recom_R = aprox_R

    for user in range(n_users):
        for listing in range(n_items):    
            if R[user][listing] > 0:
                recom_R[user][listing] = 0

    return recom_R
