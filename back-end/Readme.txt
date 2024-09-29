Quick Start Guide for back-end

Λήψη απαραίτητων πακέτων και migration

cd back-end
pip install -r "requirements.txt"
cd toLinkBack
python manage.py migrate

Για την προσθήκη dummy δεδομένων στην βάση

python manage.py populate_data

Για εκτέλεση

python manage.py runserver_plus --cert-file localhost.crt --key-file localhost.key

