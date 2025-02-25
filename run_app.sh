#!/bin/bash

# Navigate to back-end, install packages, migrate, and start the server
gnome-terminal -- bash -c "
    echo 'Starting Back-end...';
    cd back-end;
    pip install -r requirements.txt;
    cd toLinkBack;
    python manage.py migrate;
    python manage.py populate_data;
    python manage.py runserver;
    exec bash
"

# Navigate to front-end, install packages, and start the server
gnome-terminal -- bash -c "
    echo 'Starting Front-end...';
    cd front-end;
    npm i;
    npm start;
    exec bash
"