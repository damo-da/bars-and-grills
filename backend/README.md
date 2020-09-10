### Project setup
Project was bootstrapped using `django-admin.py`. The following select modules
have been added:

* CORS
* REST Framework
* JWT
* Swagger (running at /api/swagger)

For full list, see  `requirements.txt`

## Setup
For Linux/Mac:
```shell script
$ python --version # should be >3.6
$ virtualenv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py migrate --settings=api.tests.settings
$ python manage.py test --settings=api.tests.settings
```

## Run Server
```shell script
$ sourve venv/bin/activate
$ python manage.py runserver
# server will run at localhost:8000
```
