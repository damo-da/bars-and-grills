#!/usr/bin/env bash
## Build and push docker images...
## variables
# AWS_ACCOUNT_ID = <id>
# AWS_REGION = "us-west-2"
# API_ENDPOINT = "https://url.com/testing"
# API_DATABASE_CONN_STR = ""
# API_SECRET = "blahblah"

if [ -z "$AWS_ACCOUNT_ID" ]
then
  echo 'AWS Account ID not set.'
  exit 1
fi

if [ -z "$AWS_REGION" ]
then
  echo 'AWS Region not set.'
  exit 1
fi

if [ -z "$API_ENDPOINT" ]
then
  echo 'API Endpoint not set.'
  exit 1
fi

if [ -z "$API_DATABASE_CONN_STR" ]
then
  echo 'API Database connection string not set.'
  exit 1
fi

if [ -z "$API_SECRET" ]
then
  echo 'API Secret not set.'
  exit 1
fi

BASE_URL="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
API_REPO="barsngrills/api:latest"
ADMIN_PANEL_REPO="barsngrills/admin-panel:latest"
WEB_APP_REPO="barsngrills/webapp:latest"

API_URL="$BASE_URL/$API_REPO"
ADMIN_PANEL_URL="$BASE_URL/$ADMIN_PANEL_REPO"
WEB_APP_URL="$BASE_URL/$WEB_APP_REPO"


aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $BASE_URL

echo "Building Docker images on $(date)"

function deploy-api() {
  echo "Building api"

  cd backend || (echo "Failed to load backend. Execute this script from the root directory." && exit 1)

  docker build \
    -t $API_REPO \
    --build-arg DATABASE_URL="$API_DATABASE_CONN_STR" \
    --build-arg SECRET_KEY="$API_SECRET" \
    .

  echo "Tagging"
  docker tag $API_REPO "$API_URL"

  echo "Pushing"
  docker push "$API_URL"

  echo "API complete."

  printf '[{"name":"api","imageUri":"%s"}]' $API_URL > imagedefinition-api.json

  cd ..
}

function deploy-admin-panel() {
  cd app || (echo "Failed to load app. Execute this script from the root directory." && exit 1)

  echo "Building admin-panel"

  docker build \
    -t $ADMIN_PANEL_REPO \
    -f admin-panel.Dockerfile\
    --build-arg REACT_APP_API_ENDPOINT="$API_ENDPOINT" \
    .

  echo "Tagging"
  docker tag $ADMIN_PANEL_REPO "$ADMIN_PANEL_URL"
  echo "Pushing"
  docker push "$ADMIN_PANEL_URL"
  echo "Admin panel complete."

  printf '[{"name":"admin-panel","imageUri":"%s"}]' $ADMIN_PANEL_URL > imagedefinition-admin-panel.json

  cd ..
}

function deploy-webapp() {
  cd app || (echo "Failed to load app. Execute this script from the root directory." && exit 1)

  echo "Building webapp"

  docker build \
    -t $ADMIN_PANEL_REPO \
    -f webapp.Dockerfile\
    --build-arg REACT_APP_API_ENDPOINT="$API_ENDPOINT" \
    .

  echo "Tagging"
  docker tag $WEB_APP_REPO "$WEB_APP_URL"
  echo "Pushing"
  docker push "$WEB_APP_URL"
  echo "Webapp complete."

  printf '[{"name":"webapp","imageUri":"%s"}]' $WEB_APP_URL > imagedefinition-webapp.json

  cd ..
}

deploy-admin-panel
deploy-webapp
deploy-api

echo All done.

