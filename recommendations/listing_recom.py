import numpy as np


views = []
applications = []
users_network= []
n_users = 5
n_listings = 4

# Jim is like, very funny. Here are the weights he decided to use a
# random Saturday afternoon
view_weight = 0.1
apply_weight = 1

# Calculating R based on given data
R = np.zeros((n_users, n_listings))
for apl in applications:
    R[apl.user][apl.listing] += apply_weight
for view in views:
    R[view.user][view.listing] += view_weight

# Now R contains a engament metric of every user to every listing

# As only network should be factored in, according to the assigment, we create a dictionary table, showing these relations
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

# Now we can finaly do matrix factorization on R, 