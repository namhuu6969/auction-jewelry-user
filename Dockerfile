FROM node:18-alpine

WORKDIR /user-frontend

COPY package.json ./

# Install dependencies
RUN npm i

COPY . .

RUN npm run build

FROM nginx:latest as prod

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html


# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
