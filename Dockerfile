# Stage 1: Build the React app
FROM node as build

# Set working directory
WORKDIR /user-frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 80
EXPOSE 3000

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
