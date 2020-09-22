# Stage 1 - the build process
FROM node:12.10 as build-deps

ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT="$REACT_APP_API_ENDPOINT"

ENV REACT_APP_PROJECT "admin-panel"

RUN env

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.19.2-alpine
COPY --from=build-deps /usr/src/app/build /var/www
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
