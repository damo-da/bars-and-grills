FROM python:3

ARG SECRET_KEY
ARG DATABASE_URL

ENV SECRET_KEY="$SECRET_KEY"
ENV DATABASE_URL="$DATABASE_URL"
ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

COPY requirements.txt /code/

RUN pip install -r requirements.txt

COPY . /code/

EXPOSE 80

CMD [ "python", "manage.py", "runserver", "0.0.0.0:80" ]
