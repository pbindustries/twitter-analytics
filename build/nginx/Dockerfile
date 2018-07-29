FROM nginx
RUN apt-get update -qq && apt-get -y install apache2-utils
COPY ./default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
