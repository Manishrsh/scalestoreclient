# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN rm -rf node_modules package-lock.json && npm install && npm start

# Copy the rest of the application code
COPY . .

# Build the React application
CMD ["npm ", "run" ,"dev"]