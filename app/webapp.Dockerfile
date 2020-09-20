# Stage 1 - the build process
FROM node:12.10 as build-deps
ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_PROJECT "webapp"
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.19.2-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
