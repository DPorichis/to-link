# ToLink - A LinkedIn Clone

**ToLink** is a web-based social networking platform prototype developed as part of the YS14 Internet Application Technologies course at NKUA. Below you can find execution information and design notes of our implementation.


## Development Team
- Dimitrios Stefanos Porichis ([LinkedIn](https://www.linkedin.com/in/dimitrios-stefanos-porichis/))
- Georgios Ragkos ([LinkedIn](https://www.linkedin.com/in/giorgos-ragkos-631194225/))


# Quick Start Guide

To run this application you can use our `./run_app.sh` script located in the root directory of the project for Linux Based Operating Systems.

If you don't happen to have a Linux OS installed, you can manually run the front end and backend of the app using the following instractions.

### For the backend
Run the commands below to install required packages and initialize the database.

```
cd back-end
pip install -r "requirements.txt"
cd toLinkBack
python manage.py migrate
```
To add optional dummy data to the app, you can run:

```
python manage.py populate_data
```

Then you can run the server using:

```
python manage.py runserver
```

### For the frontend

Our frontend is written in **React** and is run using `npm` through Node.js. 

*Find relevant information on [how to get Node.js for your system]().*

Simply execute the following commands to fetch js packages and run the frontend.

```
cd front-end
npm i
npm start
```

