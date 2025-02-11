# Image the Container will be based on 
FROM nginx:alpine
# Copy the contents of the current directory to the /usr/share/nginx/html directory in the container
COPY . /usr/share/nginx/html
# EXpose the port the container will be listening on
EXPOSE 80

# Start the Nginx server in the foreground so you can see it
CMD ["nginx", "-g", "daemon off;"]