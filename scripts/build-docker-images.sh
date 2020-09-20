#!/usr/bin/env bash
## Build and push docker images...
## variables
# AWS_ACCOUNT_ID = <id>
# AWS_REGION = "us-west-2"
# API_ENDPOINT = "https://url.com/testing"
# API_DATABASE_CONN_STR = ""
# API_SECRET = "blahblah"

BASE_URL="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
API_REPO="barsngrills/api:latest"
ADMIN_PANEL_REPO="barsngrills/admin-panel:latest"
WEB_APP_REPO="barsngrills/webapp:latest"

API_URL="$BASE_URL/$API_REPO"
ADMIN_PANEL_URL="$BASE_URL/$ADMIN_PANEL_REPO"
WEB_APP_URL="$BASE_URL/$WEB_APP_REPO"

echo "Building Docker images on $(date)"

export DATABASE_URL="$API_DATABASE_CONN_STR"
export SECRET_KEY="$API_SECRET"

cd backend || (echo "Failed to load backend. Execute this script from the root directory." && exit 1)
docker build -t $API_REPO .
echo "Tagging"
docker tag $API_REPO "$API_ENDPOINT"
echo "Pushing"
docker push "$API_URL"
echo "API complete."
cd ..

unset DATABASE_URL
unset SECRET_KEY

export REACT_APP_API_ENDPOINT=$API_URL

cd app || (echo "Failed to load app. Execute this script from the root directory." && exit 1)
docker build -t $WEB_APP_REPO -f webapp.Dockerfile .
echo "Tagging"
docker tag $WEB_APP_REPO "$WEB_APP_URL"
echo "Pushing"
docker push "$WEB_APP_URL"
echo "Webapp complete."
cd ..

cd app || (echo "Failed to load app. Execute this script from the root directory." && exit 1)
docker build -t $ADMIN_PANEL_REPO -f admin-panel.Dockerfile .
echo "Tagging"
docker tag $ADMIN_PANEL_REPO "$ADMIN_PANEL_URL"
echo "Pushing"
docker push "$ADMIN_PANEL_URL"
echo "Admin panel complete."
cd ..

printf '[{"name":"api","imageUri":"%s"}]' "api" $API_URL > imagedefinition-api.json
printf '[{"name":"admin-panel","imageUri":"%s"}]' "api" $ADMIN_PANEL_URL > imagedefinition-admin-panel.json
printf '[{"name":"webapp","imageUri":"%s"}]' "api" $WEB_APP_URL > imagedefinition-webapp.json

echo All done.

