##### Dockerfile #####
## build stage ##
FROM node:21-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

## run stage ##
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
