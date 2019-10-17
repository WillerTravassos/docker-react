# The 'as' instruction indicates to docker that is a phase
FROM node:alpine as build
WORKDIR /client-app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Here we indicate our run phase, the lack 'as' instruction tells Docker that we want to finalize our process
FROM nginx
# Exposes the port which we want AWS Elastic Beanstalk to map incoming traffic
EXPOSE 80
# The path /usr/share/nginx/html is pre-determined by the nginx Docker image and can be found in its documentation
COPY --from=build /client-app/build /usr/share/nginx/html
# NOTE: we don't need to set a starting command since the nginx image is setup to start the nginx server right away and serve any static files in its shared folder
