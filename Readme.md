# ToLink - A LinkedIn Clone
**ToLink** is a web-based social networking platform prototype developed as part of the YS14 Internet Application Technologies course at NKUA. Below you can find execution information and design notes of our implementation.
## Development Team
- Dimitrios Stefanos Porichis ([LinkedIn](https://www.linkedin.com/in/dimitrios-stefanos-porichis/))
- Georgios Ragkos ([LinkedIn](https://www.linkedin.com/in/giorgos-ragkos-631194225/))

![image](https://github.com/user-attachments/assets/61fc45f9-beaa-44d8-bb55-b43cc03ecc9b)



# Quick Start Guide

To run this application, you can use our `./run_app.sh` script located in the project's root directory for Linux Based Operating Systems.

If you don't happen to have a Linux OS installed, you can manually run the front end and backend of the app using the following instructions.

### For the backend

Our backend is implemented using **Django**, a high-level Python web framework. 

Run the commands below to install the required packages and initialize the database.

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

*Find relevant information on [how to get Node.js for your system](https://nodejs.org/en).*

Simply execute the following commands to fetch JS packages and run the frontend.

```
cd front-end
npm i
npm start
```

# Design and implementation process

### Figma Board
Check out our [Figma board](https://www.figma.com/design/W1lw9QQmLjScI4c6Y5NAwr/Wireframes?node-id=0-1&t=LMydUBQjvVj4GcvL-1) containing our low fidelity 
wireframes as well as our first schema drafts.

### Technical information
Below we include a sort list containing key implementation details:

`todo`

### Timeframe
ToLink was developed during a tight timeframe of 1 month. Find a brief timeline of our implementation below:
`add`


# Discover To Link's features

## Signup

![Signup Footage](./readme-media/sign-up.gif)

## Feed, posts, likes and comments
![User experience Footage](./readme-media/interact.gif)

## Create and apply to job listings
![Job listing application and creation](./readme-media/job.gif)

## Build your network and message colleagues
![Network and messeging](./readme-media/network-messages.gif)

## Profile Customization
![Profile Customization Footage](./readme-media/profile-editing.gif)

## Admin view and data export
![Admin View](./readme-media/admin.gif)
